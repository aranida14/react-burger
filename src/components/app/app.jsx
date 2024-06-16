import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileDataPage,
  OrdersHistoryPage,
  NotFound404Page,
} from '../../pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/user-slice';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { fetchIngredients } from '../../services/ingredients-slice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchIngredients());
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
    <div className='mainContainer'>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path='/ingredients/:ingredientId'
               element={<IngredientDetails />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} >
          <Route path="" element={<OnlyAuth component={<ProfileDataPage />} />} />
          <Route path="orders" element={<OnlyAuth component={<OrdersHistoryPage />} />} />
        </Route>
        <Route path="*" element={<NotFound404Page />} />
      </Routes>

      {background && (
        <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal onClose={handleModalClose} title={'Детали ингредиента'}>
                  <IngredientDetails />
                </Modal>
              }
            />
        </Routes>
      )}
    </div>
  );
}

export default App;
