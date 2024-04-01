import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');

const Modal = ({isOpen, onClose, title, children}) => {
  // const [showModal, setShowModal] = React.useState(false);
  if (!isOpen) {
    return null;
  }

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
      < ModalOverlay onClick={onClose} />
    </>)
    , modalRoot
  );
}

export default Modal;