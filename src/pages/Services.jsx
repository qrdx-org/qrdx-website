import React from 'react';
import './Pages.css';

const Services = () => {
  return (
    <div className="page">
      <h1>Our Services</h1>
      <p>This page was automatically added to the routing system!</p>
      
      <section className="services-list">
        <div className="service-item">
          <h3>Web Development</h3>
          <p>Modern, responsive web applications built with React.</p>
        </div>
        <div className="service-item">
          <h3>Consulting</h3>
          <p>Expert guidance on technology choices and architecture.</p>
        </div>
        <div className="service-item">
          <h3>Support</h3>
          <p>Ongoing maintenance and support for your applications.</p>
        </div>
      </section>
    </div>
  );
};

// Route configuration metadata
export const route = {
  path: '/services',
  meta: {
    title: 'Our Services',
    description: 'Discover what we can do for you'
  }
};

export default Services;
