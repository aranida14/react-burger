import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const onClick = () => {};
  return (
    <div className='mainContainer'>
      <AppHeader />
      <div className={styles.container}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <EmailInput
          name={'email'}
          placeholder='Укажите e-mail'
          isIcon={false}
          extraClass='mt-6'
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass='mb-20 mt-6'
          onClick={onClick}
        >
          Восстановить
        </Button>
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
