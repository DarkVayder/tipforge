import React from 'react';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background element */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      {/* Main content */}
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
