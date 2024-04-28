import styles from './profile.module.css';
import AppHeader from '../components/app-header/app-header';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

export const ProfilePage = () => {
  const location = useLocation();

  const hint = (location.pathname === '/profile') ? (
    <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
      В этом разделе вы можете изменить свои персональные данные
    </p>
  ) : (location.pathname === '/profile/orders') ? (
    <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
      В этом разделе вы можете просмотреть свою историю заказов
    </p>
  ) : null;

  return (
    <div className='mainContainer'>
      <AppHeader />
      <div className={styles.profileContainer}>
        <section className={`${styles.menuContainer} mr-15 ml-5`}>
          <nav className={`${styles.menu} mb-20 mt-8`}>
            <NavLink
              to=""
              end
            >
              {({isActive}) => (
                <span 
                  className={`${styles.menuItem} text text_type_main-medium ${isActive ? '' : 'text_color_inactive'}`}>
                    Профиль
                </span>
              )}
            </NavLink>
            <NavLink
              to="orders"
            >
              {({isActive}) => (
                <span 
                  className={`${styles.menuItem} text text_type_main-medium ${isActive ? '' : 'text_color_inactive'}`}>
                    История заказов
                </span>
              )}
            </NavLink>
            <Link>
              <span 
                className={`${styles.menuItem} text text_type_main-medium text_color_inactive`}>
                  Выход
              </span>
            </Link>
          </nav>
          { hint }
        </section>
        
        <Outlet />

      </div>
    </div>
  );
};
