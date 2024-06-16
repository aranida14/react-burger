import styles from './not-found.module.css';
import { Link } from 'react-router-dom';

export const NotFound404Page = () => {
  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className='text text_type_main-large'>404 ошибка</h1>
          <p className='text text_type_main-medium'>Страница не найдена</p>
          <br />
          <br />
          <p className='text text_type_main-default text_color_inactive'>
            проверьте адрес страницы или перейдите на <Link to='/' className={styles.link}>
              главную страницу
            </Link>
          </p>
        </div>
      </div>
  );
};