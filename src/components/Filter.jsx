import React from 'react';

const languages = ['JavaScript', 'Python', 'C++', 'Java', 'Git', 'General'];

const Filter = ({ onFilterChange }) => {
  return (
    <div className="mb-4">
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
