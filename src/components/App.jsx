import { Component } from 'react';
import { getImage } from '../server/api';
import { SearchBar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';
import { Button } from './button/Button'
import Notiflix from 'notiflix';


export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImage: '',
    tags: '',
    total: 0,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await getImage(query, page);
      if (data.hits.length === 0) {
        return  (Notiflix.Notify.failure(
          'You have to enter something first to search for images!'
      ))}
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  onOpenModal = (largeImage, tags) => {
    this.setState({ showModal: true, largeImage, tags });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, largeImage: '', tags: '' });
  };

  render() {
    const { images, isLoading, total, showModal, largeImage, tags } =
      this.state;
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
      

        <SearchBar onSubmit={this.handleSubmit} />
        
          {isLoading && <Loader />}
          {images.length !== 0 && (
            <ImageGallery gallery={images} onOpenModal={this.onOpenModal} />
          )}
         {totalPage > 1 && !isLoading && images.length !== 0 && (
          <Button onClick={this.onLoadMore} />
        )}
  
        {showModal && (
          <Modal
            largeImage={largeImage}
            tags={tags}
            onCloseModal={this.onCloseModal}
          />
        )}
      </div>
    );
  }
}

// style={{
//   display: 'grid',
//   position: 'relative',
//   gridTemplateColumns: '1fr',
//   gridTemplateRows: 'auto 1fr auto',
//   gridGap: '16px',
//   paddingBottom: '24px',
// }}
// >