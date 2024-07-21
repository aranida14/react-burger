import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-card.module.css';
import { useMemo } from "react";
import { TOrderCard } from "../../utils/data";
import { useSelector } from "../../services/hooks";
import { TIngredient } from "../../utils/types";
import { useLocation } from "react-router";
import { TOrderIngredient } from "../../utils/types";

type TOrderCardProps = {
  order: TOrderCard;
}

const OrderCard = ({ order }: TOrderCardProps) => {
  const location = useLocation();
  const ingredients = useSelector((state) => state.ingredients.data);

  const orderIngredients = useMemo<TOrderIngredient[]>(
    () => (order.ingredients.map((id: string | null) => ingredients
      .find((ingredient) => ingredient._id === id))
      .filter((item) => item !== undefined) as TIngredient[])
      .reduce<TOrderIngredient[]>((groupedIngredients: TOrderIngredient[], item: TIngredient) => {
        const addedElement = groupedIngredients.find((el) => el._id === item._id);
        if (addedElement) {
          addedElement.count += 1;
          return groupedIngredients;
        }
        return [...groupedIngredients, { ...item, count: 1 }];
      }, []),
    [ingredients, order]
  );
  // const numberFormatted = `#${String(order.number).padStart(6, '0')}`;
  const maxIngredientsShown = 6;
  const orderPrice = useMemo<number>(() => {
    let sum = orderIngredients.reduce((acc: number, ingredient: TOrderIngredient) => acc + (ingredient.price * ingredient.count), 0);
    return sum;
  }, [orderIngredients]);

  const status = order.status === 'done' ? 'Выполнен'
    : order.status === 'created' ? 'Готовится' : 'Отменён';
  if (!ingredients || ingredients.length === 0) {
    return null;
  }
  return (

    <div className={`${styles.container}`}>
      <div className={styles.top}>
        <span className="text text_type_digits-default">{`#${order.number}`}</span>
        <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive" />
      </div>
      <div className={styles.middle}>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        {location.pathname === '/profile/orders' &&
          <span className="text text_type_main-default">{status}</span>}
      </div>
      <div className={styles.bottom}>
        <ul className={`${styles.images}`}>
          {orderIngredients.map((ingredient, index, ingredientsArray) => {
            if (index < maxIngredientsShown) {
              // const style = {zIndex: 100 - index, left: `calc(${-index * 1} * 15px)`, opacity: 1};
              const style = {opacity: 1};
              if (index === maxIngredientsShown - 1 && ingredientsArray.length > maxIngredientsShown) {
                style.opacity = 0.5;
              }
              return (
              <li key={ingredient._id} className={styles.imageOuterContainer} style={{zIndex: 100 - index, left: `calc(${-index * 1} * 15px)`}}>
                <div className={styles.imageContainer} style={style}>
                  <div className={styles.imageInnerContainer}>
                    <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.image}/>
                  </div>
                </div>
                {index === maxIngredientsShown - 1 && ingredientsArray.length > maxIngredientsShown
                && <div className={styles.extraCounter} style={{zIndex: 100, position: 'relative', left: '-40px'}}>
                  {/* `calc(${-index} * 1px - 40px)` */}
                      <span className="text text_type_main-default">
                        {`+${ingredientsArray.length - index}`}
                      </span>
                  </div>}
              </li>)
            } else {
              return null;
            }
          })}
        </ul>
        <div className={ `${styles.priceContainer} mt-4 mb-1`}>
            <span className={ `text text_type_digits-default ${styles.price}`}>{orderPrice}</span>
            <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>

  );
}

export default OrderCard