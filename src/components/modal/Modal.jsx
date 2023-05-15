import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onCloseModal, largeImage, tags }) => {
  const handleCloseClickBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleCloseModalClickESC = (e) => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleCloseModalClickESC);
    return () => {
      window.removeEventListener('keydown', handleCloseModalClickESC);
    };
  }, [onCloseModal]);

  return createPortal(
    <div className={styles.Overlay} onClick={handleCloseClickBackdrop}>
      <div className={styles.Modal}>
        <img src={largeImage} alt={tags} width="1000" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};