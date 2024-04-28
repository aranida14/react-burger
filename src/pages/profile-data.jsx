import styles from './profile.module.css';
import { Button, Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';

export const ProfileDataPage = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  
  const changeName = (e) => {
    setName(e.target.value);
    setIsEditing(true);
  };

  const changeLogin = (e) => {
    setLogin(e.target.value);
    setIsEditing(true);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
    setIsEditing(true);
  };

  const saveUserData = (e) => {
    e.preventDefault();
  };

  const onIconClick = (e) => {
    inputRef.current.focus();
  };

  const resetForm = (e) => {
    setIsEditing(false);
  }
  return (
    <section className={styles.formContainer}>
      <form onSubmit={saveUserData}>
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
          value={login}
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