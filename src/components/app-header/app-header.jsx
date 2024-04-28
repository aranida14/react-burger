import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className={ `${styles.header} mt-10` }>
      <nav className={ `${styles.nav} pt-4 pb-4` }>
        <ul className={ `${styles.menu} ` }>
          <li className={ `${styles.burgerConstructor} m-5 ` }>
            <Link to="/">
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default ml-2">Конструктор</span>
            </Link>
          </li>
          <li className={ `${styles.orders} m-5`}>
            <Link>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">Лента заказов</span>
            </Link>
          </li>
          <li className={ `${styles.logo} mr-9` }>
            <Link to="/">
              <Logo />
            </Link>
            
          </li>
          <li className={ `${styles.profile} m-5` }>
            <Link to="/profile">
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
