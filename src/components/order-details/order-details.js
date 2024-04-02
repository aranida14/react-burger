import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import doneImagePath from '../../images/done.svg';

const OrderDetails = ({ id }) => {
  return (
    <div className={styles.order}>
      <div className={ `${styles.orderId} text text_type_digits-large mt-10 mb-8` }>{id}</div>
      <div className='text text_type_main-medium mb-15'>идентификатор заказа</div>
      <img className='mb-15' src={doneImagePath} alt="Заказ принят" />
      <div className='text text_type_main-default mb-2'>Ваш заказ начали готовить</div>
      <div className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</div>
    </div>
  );
};

OrderDetails.propTypes = {
  id: PropTypes.string.isRequired,
}

export default OrderDetails;