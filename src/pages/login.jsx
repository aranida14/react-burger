import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header';
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const onClick = () => {};
  return (
    <div className='mainContainer'>
      <AppHeader />
      <div className={styles.container}>
        <h2 className='text text_type_main-medium'>Вход</h2>
        <EmailInput
          name={'email'}
          isIcon={false}
          extraClass='mt-6'
        />
        <PasswordInput
          name={'password'}
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass='mb-20 mt-6'
          onClick={onClick}
        >
          Войти
        </Button>
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
