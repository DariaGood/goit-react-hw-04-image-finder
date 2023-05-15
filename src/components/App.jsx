import React, { useState, useEffect, useCallback } from 'react';
import { getImage } from '../server/api';
import { SearchBar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';
import { Button } from './button/Button';
import Notiflix from 'notiflix';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async (query, page) => {
    try {
      setIsLoading(true);
      const data = await getImage(query, page);
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'You have to enter something first to search for images!'
        );
      } else {
        setImages((prevImages) => [...prevImages, ...data.hits]);
        setTotal(data.totalHits);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query !== '' || page !== 1) {
      fetchImages(query, page);
    }
  }, [query, page, fetchImages]);

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onOpenModal = (largeImage, tags) => {
    setShowModal(true);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };

  const totalPage = total / images.length;


  return (
    <div
      style={{
        display: 'grid',
        position: 'relative',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr auto',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <SearchBar onSubmit={handleSubmit} />

      {isLoading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery gallery={images} onOpenModal={onOpenModal} />
      )}
      {totalPage > 1 && !isLoading && images.length !== 0 && (
        <Button onClick={onLoadMore} />
      )}

      {showModal && (
        <Modal
          largeImage={largeImage}
          tags={tags}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
};

