import React, { useState, useEffect } from 'react';
import TipCard from './TipCard';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import tipsData from '../assets/tips.json';

const HomePage = () => {
  const loadTips = () => {
    const savedTips = localStorage.getItem('tips');
    if (savedTips) {
      return JSON.parse(savedTips);
    }
    return tipsData;
  };

  const [tips, setTips] = useState(loadTips());
  const [filteredTips, setFilteredTips] = useState(loadTips());
  const [searchQuery, setSearchQuery] = useState('');
  const [newTip, setNewTip] = useState({
    title: '',
    description: '',
    language: ''
  });
  const [editingTip, setEditingTip] = useState(null);

  useEffect(() => {
    localStorage.setItem('tips', JSON.stringify(tips));
  }, [tips]);

  const handleFilterChange = (language) => {
    const filtered = language ? tips.filter(tip => tip.language === language) : tips;
    setFilteredTips(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = tips.filter(
      tip =>
        tip.title.toLowerCase().includes(query.toLowerCase()) ||
        tip.description.toLowerCase().includes(query.toLowerCase()) ||
        tip.language.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTips(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTip({ ...newTip, [name]: value });
  };

  const handleAddOrUpdateTip = (e) => {
    e.preventDefault();

    if (editingTip) {
      const updatedTips = tips.map(tip =>
        tip.id === editingTip.id ? { ...editingTip, ...newTip } : tip
      );
      setTips(updatedTips);
      setFilteredTips(updatedTips);
      toast.success('Tip updated successfully!');
    } else {
      const newTipEntry = { ...newTip, id: Date.now().toString() };
      const updatedTips = [...tips, newTipEntry];
      setTips(updatedTips);
      setFilteredTips(updatedTips);
      toast.success('Thank you for adding a new tip!');
    }

    setNewTip({ title: '', description: '', language: '' });
    setEditingTip(null);
  };

  const handleEditTip = (tip) => {
    setNewTip({ title: tip.title, description: tip.description, language: tip.language });
    setEditingTip(tip);
  };

  const handleDeleteTip = (id) => {
    const updatedTips = tips.filter(tip => tip.id !== id);
    setTips(updatedTips);
    setFilteredTips(updatedTips);
    toast.error('Tip deleted successfully.');
  };

  return (
    <div className="min-h-screen p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 text-center">Tips-Forge 📝</h1>
      <p className='text-2xl text-center mb-3'> 🔥 Welcome to Tips-Forge! 🔥</p>
      <p className='text-center mb-3'>Where coding wisdom is forged! Dive into a world of developer insights, from beginner tricks to expert techniques. Whether you are here to learn, share, or refine your skills, Tips Forge is your hub for all things programming. Lets ignite your coding journey together!</p>

      {/* Add or Edit Tip Form */}
      <form onSubmit={handleAddOrUpdateTip} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={newTip.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            value={newTip.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="language"
            value={newTip.language}
            onChange={handleInputChange}
            placeholder="Language"
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>
        <button type="submit" className="bg-gray-800 text-white p-2 rounded-lg">
          {editingTip ? 'Update Tip' : 'Add Tip'}
        </button>
      </form>

      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      <Filter onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="relative bg-white p-4 rounded-lg shadow">
            <button 
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => handleDeleteTip(tip.id)}
            >
              <FaTrashAlt />
            </button>
            <button 
              className="absolute top-2 right-8 text-blue-500 hover:text-blue-700"
              onClick={() => handleEditTip(tip)}
            >
              <FaEdit />
            </button>
            <TipCard tip={tip} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
