import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ onClose, title, children }) => {
  React.useEffect(() => {
    const close = (e) => {
      if(e.key === 'Escape'){
        onClose();
      }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return ReactDOM.createPortal(
    (<>
      <div className={styles.modal}>
        <div className={ `${styles.header} mt-10 ml-10 mr-10` }>
          <div className={ `${styles.title} text text_type_main-large `}>{title}</div>
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
          {children}        
      </div>
      < ModalOverlay onClose={onClose} />
    </>)
    , modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}


export default Modal;