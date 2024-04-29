import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header';
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/user-slice';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loginError, userData } = useSelector((state) => state.user);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  }

  if (userData) {
    return (
      <Navigate to={'/'} />
    );
  }

  return (
    <div className='mainContainer'>
      <AppHeader />
      <div className={styles.container}>
        <h2 className='text text_type_main-medium'>Вход</h2>
        { loginError
          ? <p className={`${styles.error} text text_type_main-default`}>{loginError}</p>
          : null }
        <form onSubmit={handleSubmit}>
          <EmailInput
            name={'email'}
            value={email}
            onChange={changeEmail}
            isIcon={false}
            extraClass='mt-6'
          />
          <PasswordInput
            name={'password'}
            value={password}
            onChange={changePassword}
            extraClass="mt-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass='mb-20 mt-6'
          >
            Войти
          </Button>
        </form>
        <div className={styles.linkContainer}>
          <p className='text text_type_main-default text_color_inactive'>Вы - новый пользователь?</p>
          <Link to='/register'>
            <Button htmlType="button" type="secondary" size="medium" extraClass={styles.routeButton}>
              Зарегистрироваться
            </Button>
          </Link>
        </div>
        <div className={ `${styles.linkContainer} mt-4` }>
          <p className='text text_type_main-default text_color_inactive'>Забыли пароль?</p>
          <Link to='/forgot-password'>
            <Button htmlType="button" type="secondary" size="medium" extraClass={styles.routeButton}>
              Восстановить пароль
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
