import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');

type TModalProps = {
  onClose: () => void;
  children?: React.ReactNode;
}


const Modal = ({ onClose, children }: TModalProps): React.JSX.Element => {
  React.useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if(e.key === 'Escape'){
        onClose();
      }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose]);

  return ReactDOM.createPortal(
    (<>
      <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
          {children}      
      </div>
      < ModalOverlay onClose={onClose} />
    </>)
    , modalRoot!
  );
};

export default Modal;