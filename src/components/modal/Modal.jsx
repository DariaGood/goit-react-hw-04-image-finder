import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalClickESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalClickESC);
  }

  handleCloseModalClickESC = e => {
    const { onCloseModal } = this.props;

    if (e.key === 'Escape') {
      onCloseModal();
    }
  };

  handleCloseClickBackdrop = e => {
    const { onCloseModal } = this.props;

    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  render() {
    const { largeImage, tags } = this.props;

    return createPortal(
      <div className={styles.Overlay} onClick={this.handleCloseClickBackdrop}>
        <div className={styles.Modal}>
          <img src={largeImage} alt={tags} width="1000" />
        </div>
      </div>, 
      modalRoot

    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};