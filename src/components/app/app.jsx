import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="" element={<ProfileDataPage />} />
          <Route path="orders" element={<OrdersHistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
