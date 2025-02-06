import { useSelector } from '../services/store';
import { useLocation, Navigate } from 'react-router-dom';
import { Preloader } from '../components/ui/preloader';
import {
  isAuthCheckedSelector,
  userDataSelector
} from '../services/slices/UserSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userDataSelector);
  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    return <Navigate replace to={from} />;
  }
  return children;
};
