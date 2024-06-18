import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {
  // @ts-ignore
  const { user } = useSelector((state) => state.user);
  const userName = user?.name;
  
  return (
    <header className={ `${styles.header} mt-10` }>
      <nav className={ `${styles.nav} pt-4 pb-4` }>
        <ul className={ `${styles.menu} ` }>
          <li className={ `${styles.burgerConstructor} m-5 ` }>
            <NavLink to="/" end>
              {({isActive}) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <span className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}>
                    Конструктор
                  </span>
                </>                
              )}
            </NavLink>
          </li>
          <li className={ `${styles.orders} m-5`}>
            <Link to="/">
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
            <NavLink to="/profile">
              {({isActive}) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <span className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}>
                    {/* Личный кабинет */}
                    {userName ? userName : 'Личный кабинет'}
                  </span>
                </>
                
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
