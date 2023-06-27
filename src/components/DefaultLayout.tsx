import React from 'react';
import Header from './Header';
import Footer from './Footer';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url('/backgrounds/backdrop.jpg')`, // Replace with the path to your background image
        // Replace with the path to your background video
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
