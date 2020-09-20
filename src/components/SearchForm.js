import React from 'react';
import { navigate } from 'gatsby';

const SearchForm = ({ query }) => {
  return (
    <form role="search" method="get">
      <label htmlFor="search-input">
        <h1> Search posts </h1>{' '}
      </label>{' '}
      <input
        type="search"
        id="search-input"
        name="keywords"
        onChange={e =>
          navigate(`/search?keywords=${encodeURIComponent(e.target.value)}`)
        }
        value={query}
      />{' '}
      <button type="submit"> Submit </button>{' '}
    </form>
  );
};

export default SearchForm;
