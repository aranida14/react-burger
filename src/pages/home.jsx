import { useEffect } from 'react';
import styles from './home.module.css';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../services/ingredients-slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className='mainContainer'>
      <AppHeader />
      <main className={ styles.main }>
        <DndProvider backend={HTML5Backend}>
          {/* {isLoading && 'Загрузка...'} */}
          {data && data.length && <BurgerIngredients />}
          <BurgerConstructor /> 
        </DndProvider>
      </main>
    </div>
  );
}
