import React from 'react';
import './Pages.css';

const About = () => {
  return (
    <div className="page">
      <h1>About Us</h1>
      <p>This is the about page.</p>
      <p>Built with React, React Router, and esbuild.</p>
      
      <section className="about-content">
        <h2>Our Mission</h2>
        <p>
          We strive to build fast, modern, and scalable web applications using
          the latest technologies and best practices.
        </p>
        
        <h2>Technology Stack</h2>
        <ul className="tech-list">
          <li>React 19</li>
          <li>React Router DOM</li>
          <li>esbuild</li>
          <li>Modern CSS</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
