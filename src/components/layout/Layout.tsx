import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Drawer from './Drawer';
import { menuItems } from '../../data/menuItems';

const Layout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="app-container">
      <Header isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} menuItems={menuItems} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 