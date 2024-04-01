import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

// const BASE_API_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = React.useState({
    ingredients: [],
    loading: true,
    hasError: false,
  });
  

  React.useEffect(() => {
    const getIngredients = async () => {
      try {
        setState({...state, loading: true, hasError: false});
        const response = await fetch(INGREDIENTS_API_URL);
        const json = await response.json();
        console.log(json.data);
        setState({
          ingredients: json.data,
          loading: false,
          hasError: false,
        });
        // console.log(state);
      } catch (err) {
        setState({
          ...state,
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
        <BurgerIngredients ingredients={state.ingredients}/>
        <BurgerConstructor ingredients={state.ingredients}/>
      </main>
    </div>
  );
}

export default App;
