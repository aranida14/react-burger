import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../utils/api';
import { useState } from 'react';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const onChange = (e) => {
    setEmail(e.target.value);
  }

  const resetPassword = (e) => {
    e.preventDefault();
    request('/password-reset', {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
    }).then((data) => {
      if (data.success) {
        navigate('/reset-password');
      } else {
        console.error('Ошибка');
      }
      
    }).catch((e) => console.error(e));
  };
  return (
    <div className='mainContainer'>
      <AppHeader />
      <div className={styles.container}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <form onSubmit={resetPassword}>
          <EmailInput
            name={'email'}
            value={email}
            placeholder='Укажите e-mail'
            isIcon={false}
            onChange={onChange}
            extraClass='mt-6'
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass='mb-20 mt-6'
          >
            Восстановить
          </Button>
        </form>
        
        <div className={styles.linkContainer}>
          <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
          <Link to='/login'>
            <Button htmlType="button" type="secondary" size="medium" extraClass={styles.routeButton}>
              Войти
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
