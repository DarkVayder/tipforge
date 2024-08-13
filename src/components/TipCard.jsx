import React from 'react';

const TipCard = ({ tip }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2">{tip.title}</h2>
      <p className="text-gray-700 mb-2">{tip.description}</p>
      <span className="text-gray-500">{tip.language}</span>
    </div>
  );
};

export default TipCard;
