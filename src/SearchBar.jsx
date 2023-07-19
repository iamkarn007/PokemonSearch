import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      id="search"
      className="search-bar"
      placeholder="Search Pokemon"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
