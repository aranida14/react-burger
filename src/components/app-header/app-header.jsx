import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={ `${styles.header} mt-10` }>
      <nav className={ `${styles.nav} pt-4 pb-4` }>
        <ul className={ `${styles.menu} ` }>
          <li className={ `${styles.burgerConstructor} m-5 ` }>
            <a href="#">
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default ml-2">Конструктор</span>
            </a>
          </li>
          <li className={ `${styles.orders} m-5`}>
            <a href="#">
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">Лента заказов</span>
            </a>
          </li>
          <li className={ `${styles.logo} mr-9` }>
            <a href="#">
              <Logo />
            </a>
            
          </li>
          <li className={ `${styles.profile} m-5` }>
            <a href="#">
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
