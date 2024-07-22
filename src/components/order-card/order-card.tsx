import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-card.module.css';
import { useMemo } from "react";
import { TOrderCard } from "../../utils/types";
import { useSelector } from "../../services/hooks";
// import { TIngredient } from "../../utils/types";
import { useLocation } from "react-router";
import { TCountedIngredient } from "../../utils/types";
import { getGroupedIngredients, getIngredientsByIds, getLocalizedOrderStatus, getOrderPrice } from "../../utils/utils";
import { MAX_INGREDIENTS_ICONS_SHOWN } from "../../utils/constants";
import Loader from "../loader/loader";

type TOrderCardProps = {
  order: TOrderCard;
}

const OrderCard = ({ order }: TOrderCardProps) => {
  const location = useLocation();
  const ingredients = useSelector((state) => state.ingredients.data);

  const orderIngredients = useMemo<TCountedIngredient[]>(
    () => getGroupedIngredients(getIngredientsByIds(order.ingredients, ingredients)),
    [ingredients, order, getGroupedIngredients, getIngredientsByIds]
  );

  const orderPrice = useMemo<number>(() => getOrderPrice(orderIngredients), [orderIngredients]);

  const status = getLocalizedOrderStatus(order.status);

  if (!ingredients.length) {
    return <Loader />;
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
            if (index < MAX_INGREDIENTS_ICONS_SHOWN) {
              // const style = {zIndex: 100 - index, left: `calc(${-index * 1} * 15px)`, opacity: 1};
              const style = {opacity: 1};
              if (index === MAX_INGREDIENTS_ICONS_SHOWN - 1 && ingredientsArray.length > MAX_INGREDIENTS_ICONS_SHOWN) {
                style.opacity = 0.5;
              }
              return (
              <li key={ingredient._id} className={styles.imageOuterContainer} style={{zIndex: 100 - index, left: `calc(${-index * 1} * 15px)`}}>
                <div className={styles.imageContainer} style={style}>
                  <div className={styles.imageInnerContainer}>
                    <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.image}/>
                  </div>
                </div>
                {index === MAX_INGREDIENTS_ICONS_SHOWN - 1 && ingredientsArray.length > MAX_INGREDIENTS_ICONS_SHOWN
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