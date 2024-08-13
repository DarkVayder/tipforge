import React from 'react';

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search tips..."
        className="p-2 border border-gray-300 rounded-lg w-full"
      />
    </div>
  );
};

export default SearchBar; 
