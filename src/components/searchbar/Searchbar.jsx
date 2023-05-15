import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import styles from './searchbar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      Notiflix.Notify.failure(
        'You have to enter something first to search for images!'
      );
      return;
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormBtn}>
          <span className={styles.SearchFormBtnLabel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 20 20"
            >
              <title>search</title>
              <path d="M19 17l-5.15-5.15a7 7 0 1 0-2 2L17 19zM3.5 8A4.5 4.5 0 1 1 8 12.5 4.5 4.5 0 0 1 3.5 8z" />
            </svg>
          </span>
        </button>

        <input
          className={styles.SearchFormInput}
          onChange={handleChange}
          value={search}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
