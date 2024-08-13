import React, { useState } from 'react';
import TipCard from '../components/TipCard';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import tipsData from '../assets/tips.json';

const HomePage = () => {
  const [filteredTips, setFilteredTips] = useState(tipsData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (language) => {
    const filtered = language ? tipsData.filter(tip => tip.language === language) : tipsData;
    setFilteredTips(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = tipsData.filter(
      tip =>
        tip.title.toLowerCase().includes(query.toLowerCase()) ||
        tip.description.toLowerCase().includes(query.toLowerCase()) ||
        tip.language.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTips(filtered);
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 font-Inter text-center">Tip-Forge</h1>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Discover and share useful tips for learning programming languages.
      </p>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      <Filter onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTips.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
