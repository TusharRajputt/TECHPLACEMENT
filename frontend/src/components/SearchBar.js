import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [author, setAuthor] = useState('');

  const handleSearch = () => {
    onSearch(author);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Search by author"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
