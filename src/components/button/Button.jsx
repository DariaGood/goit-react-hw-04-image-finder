import PropTypes from 'prop-types';
import styles from './button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={styles.LoaderMoreContainer}>

    <button className={styles.LoaderMoreBtn} type="button" onClick={() => onClick()}>
      Load more
    </button>
    </div>

  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

