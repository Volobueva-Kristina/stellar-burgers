import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TOrdersData
} from '../../utils/types';

export const userTest = {
  email: 'musickristy2@yandex.ru',
  name: 'Жак-Ив'
};

export const updateUserData = {
  success: true,
  user: userTest
};

export const userTestLogin = {
  success: true,
  user: {
    email: 'musickristy2@yandex.ru',
    name: 'Жак-Ив'
  }
};

export const registerData = {
  email: 'musickristy2@yandex.ru',
  name: 'Жак-Ив',
  password: '124427427'
};

export const loginData = {
  email: 'musickristy2@yandex.ru',
  password: '124427427'
};

export const mockIngredients: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: '643d69a5c3f7b9001cfa0941'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    id: '643d69a5c3f7b9001cfa0945'
  }
];

export const newBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const newIngredient = {
  _id: '643d69a5c3f7b9001cfa0945',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  id: '643d69a5c3f7b9001cfa0945'
};

export const mockOrder: TOrder = {
  _id: '123',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2025-02-19T20:50:38.287Z',
  updatedAt: '2025-02-19T20:50:38.933Z',
  number: 68884
};

export const mockPayload = {
  success: true,
  name: 'Space флюоресцентный бургер',
  order: {
    _id: '123',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2025-02-19T20:50:38.287Z',
    updatedAt: '2025-02-19T20:50:38.933Z',
    number: 68884
  }
};

export const mockResponse = { order: mockOrder };

export const feedsResponse = {
  success: true,
  orders: [
    {
      _id: '123',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2025-02-19T20:50:38.287Z',
      updatedAt: '2025-02-19T20:50:38.933Z',
      number: 68884
    }
  ],
  total: 100,
  totalToday: 10
};

export const feedExpectedResult = {
  orders: feedsResponse.orders,
  total: feedsResponse.total,
  totalToday: feedsResponse.totalToday,
  isLoading: false,
  error: null,
  modal: null
};

export const getOrderByNumberMock = {
  success: true,
  orders: [
    {
      _id: '67b6441e133acd001be52445',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
      owner: '67b64177133acd001be5243d',
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2025-02-19T20:50:38.287Z',
      updatedAt: '2025-02-19T20:50:38.933Z',
      number: 68884
    }
  ]
};

export const expectedResult = {
  success: true,
  order: {
    _id: '123',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2025-02-19T20:50:38.287Z',
    updatedAt: '2025-02-19T20:50:38.933Z',
    number: 68884
  },
  name: 'Space флюоресцентный бургер'
};

export const mockOrdersData: TOrdersData = {
  orders: [mockOrder],
  total: 100,
  totalToday: 10
};

export const mockOrders: TOrder[] = [
  {
    _id: '123',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2025-02-19T20:50:38.287Z',
    updatedAt: '2025-02-19T20:50:38.933Z',
    number: 68884
  },
  {
    _id: '456',
    ingredients: ['643d69a5c3y7b9001cfa093c', '6y3d69a5c3f7b9001cfa0941'],
    status: 'pending',
    name: 'Флюоресцентный бургер',
    createdAt: '2025-03-20T10:15:30.000Z',
    updatedAt: '2025-03-20T10:15:30.000Z',
    number: 68885
  }
];

export const mockState = {
  orders: {
    orders: mockOrders,
    currentOrder: mockOrders[0],
    isLoading: false,
    error: null
  }
};
