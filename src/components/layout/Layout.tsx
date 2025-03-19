import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 