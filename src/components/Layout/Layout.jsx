import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; {new Date().getFullYear()} QRDX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
