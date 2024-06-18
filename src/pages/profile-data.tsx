import styles from './profile.module.css';
import { Button, Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserResetError } from '../services/user-slice';

export const ProfileDataPage = () => {
  // @ts-ignore
  const { user, updateUserError } = useSelector((state) => state.user);
  const [ currentName, currentEmail ] =
    user ? [user.name, user.email] : ['', ''];
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsEditing(false);
    setName(currentName);
    setEmail(currentEmail);
    setPassword('');
  }, [user]);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsEditing(true);
  };

  const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEditing(true);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsEditing(true);
  };

  const submitUserUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUserData: { name?: string; email?: string; password?: string } = {};
    if (name !== currentName) {
      newUserData.name = name;
    }
    if (email !== currentEmail) {
      newUserData.email = email;
    }
    if (password) {
      newUserData.password = password;
    }
    // @ts-ignore
    dispatch(updateUser(newUserData));
    //TODO вывести сообщение об успехе
  };

  const onIconClick = () => {
    inputRef.current?.focus();
  };

  const resetForm = () => {
    setIsEditing(false);
    setName(currentName);
    setEmail(currentEmail);
    setPassword('');
    dispatch(updateUserResetError());
  }
  return (
    <section className={styles.formContainer}>
      {updateUserError && <p className={styles.error}>{updateUserError}</p>}
      <form onSubmit={submitUserUpdate}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={changeName}
          onIconClick={onIconClick}
          name={'name'}
          value={name}
          icon={'EditIcon'}
          ref={inputRef}
          size={'default'}
          extraClass='mt-6'
        />
        <EmailInput
          name={'email'}
          value={email}
          onChange={changeLogin}
          isIcon={true}
          extraClass='mt-6'
        />
        <PasswordInput
          name={'password'}
          value={password}
          onChange={changePassword}
          icon={'EditIcon'}
          extraClass="mt-6"
        />
        {isEditing && 
          <div className={styles.buttons}>
            <Button
              htmlType="reset"
              type="secondary"
              size="medium"
              extraClass='mb-20 mt-6'
              onClick={resetForm}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass='mb-20 mt-6'
            >
              Сохранить
            </Button>
          </div>
        }
      </form>
    </section>
  )
};