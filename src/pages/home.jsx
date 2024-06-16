import styles from './home.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Loader from '../components/loader/loader';

export const HomePage = () => {
  const { data, isLoading, error } = useSelector((state) => state.ingredients);

  if (isLoading) {
    return <Loader />;
  }

  return (
      <main className={ styles.main }>
        <DndProvider backend={HTML5Backend}>
          {data && data.length && <BurgerIngredients />}
          <BurgerConstructor /> 
        </DndProvider>
      </main>
  );
}
