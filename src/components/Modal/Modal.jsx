import  { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, children}) {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code !== 'Escape') {
        return;
      }
      onClose();
  };

    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [onClose]);


 const closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
        onClose();
    }
  }

  return createPortal(
    <div className="overlay" onClick={closeByBackdrop}>
      <div className="modal">
        {children}
      </div>
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
}