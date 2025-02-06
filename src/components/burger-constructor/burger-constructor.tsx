import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import {
  clearConstructor,
  selectConstructorItems,
  selectOrderModal,
  selectOrderRequest,
  createOrder
} from '../../services/slices/BurgerSlice';
import { userDataSelector } from '../../services/slices/UserSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModal);
  const user = useSelector(userDataSelector);

  const createDataBurgerForOrder = useMemo(() => {
    if (!constructorItems.ingredients || !constructorItems.bun) {
      return [];
    }

    const ingredientsIds = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );

    return [
      constructorItems.bun._id,
      ...ingredientsIds,
      constructorItems.bun._id
    ];
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(createOrder(createDataBurgerForOrder));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
