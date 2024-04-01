import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={ `${styles.header} mt-10` }>
      <nav className={ `${styles.nav} pt-4 pb-4` }>
        <ul className={ `${styles.menu} ` }>
          <li className={ `${styles.burgerConstructor} m-5 mr-7` }>
            <BurgerIcon type="primary" />
            <a className="text text_type_main-default ml-2" href="#">Конструктор</a>
          </li>
          <li className={ `${styles.orders} m-5`}>
            <ListIcon type="secondary" />
            <a className="text text_type_main-default text_color_inactive ml-2" href="#">Лента заказов</a>
          </li>
          <li className={ styles.logo }><Logo /></li>
          <li className={ `${styles.profile} m-5` }>
            <ProfileIcon type="secondary" />
            <a className="text text_type_main-default text_color_inactive ml-2" href="#">Личный кабинет</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
