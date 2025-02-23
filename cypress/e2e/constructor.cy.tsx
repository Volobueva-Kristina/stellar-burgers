import { access } from 'fs';

describe('проверяем конструктор бургеров', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');

    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('mock-refreshToken')
    );
    cy.setCookie('accessToken', 'mock-accessToken');

    cy.visit('http://localhost:4000');
  });
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
  it('тест добавления булок', function () {
    cy.contains('Выберите булки').should('exist');

    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();

    cy.contains('Выберите булки').should('not.exist');

    cy.get('[data-cy=constructor-bun-1]')
      .contains('Флюоресцентная булка R2-D3 (верх)')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Флюоресцентная булка R2-D3 (низ)')
      .should('exist');
  });
  it('тест открытия модального окна', function () {
    cy.contains('Детали ингредиента').should('not.exist');

    cy.contains('Флюоресцентная булка R2-D3').click();

    cy.contains('Детали ингредиента').should('exist');

    cy.get('#modals').contains('Флюоресцентная булка R2-D3').should('exist');
  });
  it('тест закрытия модального окна по клику на крестик', function () {
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('h3').contains('Детали ингредиента').parent().find('button').click();

    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('тест закрытия модального окна по клику вне его (по оверлаю)', function () {
    cy.contains('Флюоресцентная булка R2-D3').click();

    cy.contains('Детали ингредиента').should('exist');

    cy.get('[data-cy=modal-overlay]').click('left', { force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('тест сборка заказа и создание заказа', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=summ]').click();
    cy.wait('@postOrder');

    cy.contains('идентификатор заказа').should('exist');
    cy.get('[data-cy=order-number]').contains('68691').should('exist');

    cy.get('[data-cy=modal-close]').click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.get('[data-cy=constructor-bun-1]').should('not.exist');
    cy.get('[data-cy=constructor-bun-2]').should('not.exist');
    cy.get('[data-cy=constructor-ingredients]').contains('Выберите начинку');
    cy.get('[data-cy=constructor-ingredients]').within(() => {
      cy.get('li').should('have.length', 0);
    });
  });
});
