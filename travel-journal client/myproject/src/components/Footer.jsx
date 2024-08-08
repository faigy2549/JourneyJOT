import React from 'react';
import '../style sheets/HomePage.css';

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024 JourneyJOT | All Rights Reserved</p>
      <p>Terms of Service | Privacy Policy</p>
      <p>Contact Us: <i className="pi pi-envelope" /> <a href="mailto:info@journeyjot.com">info@journeyjot.com</a></p>
    </div>
  );
};

export default Footer;
