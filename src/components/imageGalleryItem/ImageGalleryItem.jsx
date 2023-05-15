import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onOpenModal,
}) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <div onClick={() => onOpenModal(largeImageURL, tags)}>
        <img className={styles.ImageGalleryItemImage} src={webformatURL} alt={tags} />
      </div>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};