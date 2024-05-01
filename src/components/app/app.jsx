import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileDataPage,
  OrdersHistoryPage
} from '../../pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/user-slice';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import AppHeader from '../app-header/app-header';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div className='mainContainer'>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} >
          <Route path="" element={<OnlyAuth component={<ProfileDataPage />} />} />
          <Route path="orders" element={<OnlyAuth component={<OrdersHistoryPage />} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
