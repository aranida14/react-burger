import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ResetPasswordPage = () => {
  const onClick = () => {};
  return (
    <div className='mainContainer'>
      <AppHeader />
      <div className={styles.container}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <PasswordInput
          name={'password'}
          placeholder='Введите новый пароль'
          extraClass="mt-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={() => {}}
          name={'code'}
          size={'default'}
          extraClass='mt-6'
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass='mb-20 mt-6'
          onClick={onClick}
        >
          Сохранить
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
