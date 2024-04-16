import styles from './login.module.css';
import AppHeader from '../components/app-header/app-header';
import { Button, Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const onClick = () => {};
  return (
    <div className='mainContainer'>
      <AppHeader />
      <div className={styles.container}>
        <h2 className='text text_type_main-medium'>Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={() => {}}
          name={'name'}
          size={'default'}
          extraClass='mt-6'
        />
        <EmailInput
          name={'email'}
          isIcon={false}
          extraClass='mt-6'
          onChange={() => {}}
        />
        <PasswordInput
          name={'password'}
          extraClass="mt-6"
          onChange={() => {}}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass='mb-20 mt-6'
          onClick={onClick}
        >
          Зарегистрироваться
        </Button>
        <div className={styles.linkContainer}>
          <p className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</p>
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