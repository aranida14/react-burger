import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks/hooks';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {
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
            <NavLink to="/feed">
              {({isActive}) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <span className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}>
                    Лента заказов
                  </span>
                </>                
              )}
            </NavLink>
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
