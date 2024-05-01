import styles from './login.module.css';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { request } from '../utils/api';

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [checkCode, setCheckCode] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isPasswordReset = localStorage.getItem('isPasswordReset');
    if (!isPasswordReset) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  const changeCheckCodeInput = (e) => {
    setCheckCode(e.target.value);
    setErrorMsg(null);
  };

  const changePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const resetPassword = (e) => {
    e.preventDefault();
    request('/password-reset/reset', {
      method: "POST",
      body: JSON.stringify({ password: password, token: checkCode }),
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
      },
    }).then((data) => {
      if (data.success) {
        setErrorMsg(null);
        localStorage.removeItem('isPasswordReset');
        navigate('/', { replace: true });
      } else {
        setErrorMsg('Некорректно введён код из письма');
      }
      
    }).catch((e) => {
      console.error(e);
      setErrorMsg('Некорректно введён код из письма');
    });  
  };
  return (
    <>
      <div className={styles.container}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        { errorMsg
          ? <p className={`${styles.error} text text_type_main-default`}>{errorMsg}</p>
          : null }
        <form onSubmit={resetPassword}>
          <PasswordInput
            name={'password'}
            placeholder='Введите новый пароль'
            onChange={changePasswordInput}
            value={password}
            extraClass="mt-6"
            required
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={changeCheckCodeInput}
            value={checkCode}
            name={'checkCode'}
            size={'default'}
            extraClass='mt-6'
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass='mb-20 mt-6'
          >
            Сохранить
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
    </>
  );
};
