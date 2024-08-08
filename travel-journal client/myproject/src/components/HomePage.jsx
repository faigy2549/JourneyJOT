import React, { useState, useMemo } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import '../style sheets/HomePage.css';
import { useWeather } from '../hooks/useWeather';
import { addEmail } from '../Services/EmailService';
import { Message } from 'primereact/message';
import { Carousel } from 'primereact/carousel';
import { Rating } from 'primereact/rating';

const HomePage = () => {
  const locations = useMemo(() => ['Israel', 'New York', 'China'], []);
  const { weatherData } = useWeather(locations);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const addEmailToList = async () => {
    let addEmailResponse = await addEmail(email);
    if (addEmailResponse) {
      setSuccess("added")
    } else {
      setSuccess("not added")
    }
  }
  const reviewData=[
    {text:"Overall I gave this app 5 stars for keeping it simple, doing what I need it to do,and having a very responsive staff that cares about getting good feedback and is willing to work for it..."
    ,rating:'5'
    },
    {text:"In a fast-paced world, it can be difficult to keep up with the mind. So many thoughts, so little time to remember them. JourneyJOT is the electronic solution people on the go need to record their fun stuff..."
    ,rating:'4'
  },
  {text:"Once you're done committing your thoughts to screen, it's time to make your entry easy to find in the future. JourneyJOT offers powerful and fun tagging and categorizing features..."
    ,rating:'5'
  },
  ];
  const reviewTemplate = (review, index) => {
    if (!review) return <div>Loading...</div>;

    return (
      <div
        className="weather-item carousel-image"
        key={index}
        style={{ backgroundImage: `url(https://localhost:44393/assets/review.png)`,height: '480px'}}
      >
        <div className="review-carousel-text">
        <Rating value={review.rating}  readOnly cancel={false} ></Rating>
          <h3>{review.text}</h3>    
        </div>
      </div>
    );
  };
  const locationData=[
    {location:'Chiagio',image: 'bay.jpg'},
    {location:'Venice', image: 'assets/venice.jpg'},
    {location:'Austria', image: 'assets/mountain.JPG'}
  ];
  const locationTemplate = (location, index) => {
    if (!location) return <div>Loading...</div>;

    return (
      <div
        className="weather-item carousel-image"
        key={index}
        style={{ backgroundImage: `url(https://localhost:44393/${location.image})`, height: '480px' }}
      >
        <div className="locations-carousel-text" >
          <h3>{location.location}</h3>    
        </div>
      </div>
    );
  };
  const weatherTemplate = (weather, index) => {
    if (!weather) return <div>Loading...</div>;
    const locationImages = {
      'Israel': 'israel.jpg',
      'New York': 'manhatton.png',
      'China': 'manhatton.png'
    };
    return (
      <div
        className="weather-item carousel-image"
        key={index}
        style={{ backgroundImage: `url(https://localhost:44393/assets/weather.png)` , height: '480px'}}
      >
        <div className="weather-carousel-text">
          <h3>Visit {weather?.location}</h3>
          <p>Temperature: {weather?.temperature} °C</p>
          <p>Visibility: {weather?.visibility>12?`Clear ${weather?.visibility} km`:`Foggy ${weather?.visibility} km`} </p>
          <p>Rain: {weather?.rainIntensity === 0 ? "❌" : "✔️"}</p>
          <p>Snow: {weather?.snowIntensity === 0 ? "❌" : "✔️"}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="homepage">
      <div className="container">
        <div className="carousel-section">
          <div className="carousel-container custom-carousel">
            <Carousel 
            value={reviewData} 
            itemTemplate={reviewTemplate} 
            numVisible={1} numScroll={1} 
            showIndicators={false}
            circular={true} />
          </div>
          {/* <Divider layout="vertical" /> */}
          <div className="carousel-container custom-carousel">
            <Carousel 
            value={locationData} 
            itemTemplate={locationTemplate} 
            numVisible={1} 
            numScroll={1} 
            showIndicators={false} 
            autoplayInterval={10000}
            circular={true} />
          </div>
          <div className="carousel-container custom-carousel">
            <Carousel 
            value={weatherData} 
            itemTemplate={weatherTemplate} 
            numVisible={1} 
            numScroll={1} 
            showIndicators={false}
            circular={true}  />
          </div>
        </div>
         <div className="email-bar-container">
  <div className="joinEmail-text">
    <h3 style={{ fontFamily: 'fantasy' }}>Get On The List 📧</h3>
    <h5>Subscribe to JourneyJOT emails for people's cool journeys around the globe</h5>
    <h5>Can't wait to see you 😎</h5>
  </div>
  <div className="email-input-container">
    {success === "added" ? <Message severity="success" text="Email Added Successfully" />
      : success === "not added" ? <Message severity="error" text="Please try again" />
        : success === "exists" ? <Message severity="warn" text="You are already on our list..." />
          : null}
    <InputText
      keyfilter="email"
      placeholder="Enter your email address"
      style={{ width: '300px', height: '50px', borderRadius: '40px', padding: '0.5rem' }}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Button
      type="submit"
      label="Join The Fun"
      style={{ padding: '0.5rem 1rem', backgroundColor: 'black', color: 'white', borderRadius: '5px', fontFamily: 'fantasy', height: '50px' }}
      onClick={addEmailToList}
    />
  </div>
</div>
      </div>
    </div>
  );
};

export default HomePage;
