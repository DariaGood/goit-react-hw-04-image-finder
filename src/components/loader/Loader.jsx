import { BallTriangle } from 'react-loader-spinner';
import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="rgba(128, 128, 128, 0.9)"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};

