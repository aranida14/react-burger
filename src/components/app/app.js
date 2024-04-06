import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients-slice';

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.ingredients);

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, [])

  return (
    <div className={ styles.app }>
      <AppHeader />
      <main className={ styles.main }>
        {/* {loading && 'Загрузка...'} */}
        {data && data.length && <BurgerIngredients />}
        <BurgerConstructor/>
      </main>
    </div>
  );
}

export default App;
