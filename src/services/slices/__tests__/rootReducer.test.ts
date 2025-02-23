import { rootReducer } from '../../store';
import { initialState as userInitialState } from '../UserSlice';
import { initialState as ingredientsInitialState } from '../IngredientsSlice';
import { initialState as feedInitialState } from '../FeedSlice';
import { initialState as burgerInitialState } from '../BurgerSlice';
import { initialState as ordersInitialState } from '../OrdersSlice';

test('тест rootReducer', () => {
  const expectedInitialState = {
    user: userInitialState,
    ingredients: ingredientsInitialState,
    feeds: feedInitialState,
    createOrder: burgerInitialState,
    orders: ordersInitialState
  };

  const result = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  expect(result).toEqual(expectedInitialState);
});
