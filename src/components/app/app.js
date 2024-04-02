import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredientsData, setIngredientsData] = React.useState({
    ingredients: [],
    loading: true,
    hasError: false,
  });
  

  React.useEffect(() => {
    const getIngredients = async () => {
      try {
        setIngredientsData({...ingredientsData, loading: true, hasError: false});
        const response = await fetch(INGREDIENTS_API_URL);
        if (!response.ok) {
          throw new Error("Api response not ok");
        }
        const json = await response.json();
        setIngredientsData({
          ingredients: json.data,
          loading: false,
          hasError: false,
        });
      } catch (err) {
        setIngredientsData({
          ...ingredientsData,
          loading: false,
          hasError: true
        });
      }  
    };
    getIngredients();
  }, [])

  return (
    <div className={ styles.app }>
      <AppHeader />
      <main className={ styles.main }>
        <BurgerIngredients ingredients={ingredientsData.ingredients}/>
        <BurgerConstructor ingredients={ingredientsData.ingredients}/>
      </main>
    </div>
  );
}

export default App;
