import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients-slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { addIngredient } from '../../services/burger-constructor-slice';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.ingredients);

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const onDropHandler = (ingredient) => {
    dispatch(addIngredient({ ...ingredient, uuid: uuidv4() }));
  };

  return (
    <div className={ styles.app }>
      <AppHeader />
      <main className={ styles.main }>
        <DndProvider backend={HTML5Backend}>
          {/* {isLoading && 'Загрузка...'} */}
          {data && data.length && <BurgerIngredients />}
          <BurgerConstructor onDropHandler={onDropHandler}/>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
