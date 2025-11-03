import React from 'react';
import './Pages.css';

const Contact = () => {
  return (
    <div className="page">
      <h1>Contact Us</h1>
      <p>This is the contact page.</p>
      <p>Get in touch with us for more information.</p>
      
      <section className="contact-info">
        <div className="contact-method">
          <h3>Email</h3>
          <p>contact@qrdx.example</p>
        </div>
        <div className="contact-method">
          <h3>Location</h3>
          <p>Your City, Your Country</p>
        </div>
        <div className="contact-method">
          <h3>Phone</h3>
          <p>+1 (555) 123-4567</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
