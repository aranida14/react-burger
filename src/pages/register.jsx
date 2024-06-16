import styles from './login.module.css';
import { Button, Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../services/user-slice';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { registerUserError } = useSelector((state) => state.user);  

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password, name };
    dispatch(registerUser(user));
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className='text text_type_main-medium'>Регистрация</h2>
        { registerUserError
          ? <p className={`${styles.error} text text_type_main-default`}>{registerUserError}</p>
          : null }
        <form onSubmit={handleSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={changeName}
            name={'name'}
            value={name}
            size={'default'}
            extraClass='mt-6'
          />
          <EmailInput
            name={'email'}
            value={email}
            isIcon={false}
            extraClass='mt-6'
            onChange={changeEmail}
          />
          <PasswordInput
            name={'password'}
            value={password}
            extraClass="mt-6"
            onChange={changePassword}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass='mb-20 mt-6'
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.linkContainer}>
          <p className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</p>
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