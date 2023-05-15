import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.css';

export const ImageGallery = ({ gallery, onOpenModal }) => {
  return (
    <ul className={styles.imageGallery}>
      {gallery.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

