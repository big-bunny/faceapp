import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/backgrounds/backy.jpg')`, // Replace with the path to your background image
      }}
    >
      <Header />
      <div className="container mx-auto py-40">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
