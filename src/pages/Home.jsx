import React from 'react';
import './Pages.css';

const Home = () => {
  return (
    <div className="page">
      <h1>Welcome Home</h1>
      <p>This is the home page of your React application with routing.</p>
      <p>Navigate using the links above to explore other pages.</p>
      
      <section className="features">
        <div className="feature-card">
          <h3>Fast Development</h3>
          <p>Built with esbuild for lightning-fast builds and hot reload.</p>
        </div>
        <div className="feature-card">
          <h3>Modern Stack</h3>
          <p>Using React 19 and React Router for a modern development experience.</p>
        </div>
        <div className="feature-card">
          <h3>Production Ready</h3>
          <p>Professional structure with organized components and styles.</p>
        </div>
      </section>
    </div>
  );
};

// Route configuration metadata
export const route = {
  path: '/',
  meta: {
    title: 'Home',
    description: 'Welcome to QRDX Website'
  }
};

export default Home;
