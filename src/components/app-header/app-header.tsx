import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userDataSelector } from '../../services/slices/UserSlice';

export const AppHeader: FC = () => {
  const user = useSelector(userDataSelector);
  const userName = user?.name || '';
  return (
    <>
      <AppHeaderUI userName={userName} />
      <Outlet />
    </>
  );
};
