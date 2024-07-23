import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { InputText } from 'primereact/inputtext';
import './style sheets/HomePage.css';
import  MenuBar  from './MenuBar';

const HomePage = () => {
  const [images, setImages] = useState([
    { src: 'https://localhost:44393/assets/venice.JPG', text: '', style: "carousel-text-1" },
   // switch to normal vid
    { src: 'https://localhost:44393/assets/cover.mp4', text: '', style: "carousel-text-2" },
    { src: 'https://localhost:44393/assets/bay.jpg', text: '', style: "carousel-text-3" },
  ]);

  const itemTemplate = (item) => {
    return (
      <div className="image-container">
       {item.src.includes('mp4') ? (
       <video
       width="100%"
       height="100%"
       controls
       muted
       autoPlay
       loop
     >
       <source src={item.src} type="video/mp4" />
     </video>
        ) : (
          <div
            className="carousel-image"
            style={{
              backgroundImage: `url(${item.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.8,
            }}
          >
            <div className={item.style}>
              <h2>{item.text}</h2>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
  <div>      
    <div className="carousel-container">
      <Carousel
        value={images}
        numVisible={1}
        numScroll={1}
        itemTemplate={itemTemplate}
        circular
        autoplayInterval={4000}
        className="custom-carousel"
      />
  </div>

  <div className="joinEmail">
      <div className="joinEmail-text">
        <h3 style={{fontFamily:'fantasy' }}>Get On The List 📧</h3>
        <h5>Subscribe to JourneyJOT emails for peoples cool journeys around the globe</h5>
        <h5>can't wait to see you 😎</h5>
      </div>
      <InputText keyfilter="email" placeholder="Enter your email address" style={{ width: '300px', height: '50px', borderRadius: '40px', padding: '0.5rem', margin: '20px 20px' }} />
      <Button type="submit" label="Join The Fun" style={{ padding: '0.5rem 1rem', backgroundColor: 'black', color: 'white', borderRadius: '5px',fontFamily:'fantasy' }}
              onClick={(e) => {
                // your function to handle the subscription
              }} />
    </div>

    <div className="footer">
      <p>&copy; 2024 JourneyJOT | All Rights Reserved</p>
      <p>Terms of Service | Privacy Policy</p>
      <p>Contact Us: <i icon="pi pi-envelope" /> <a href="mailto:info@journeyjot.com">info@journeyjot.com</a></p>
    </div>
</div>
    
  );
};

export default HomePage;
