import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StorySplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => {
      if (current === 2) {  // Assuming you have 3 slides
        setTimeout(onComplete, 1000); // Automatically finish after the last slide
      }
    },
  };

  return (
    <div className="splash-container">
      <Slider {...settings}>
        <div className="story-slide">
          <h2>Welcome to Our App!</h2>
          <p>Some cool feature info here...</p>
        </div>
        <div className="story-slide">
          <h2>Another Awesome Feature</h2>
          <p>Explaining how it works...</p>
        </div>
        <div className="story-slide">
          <h2>Get Started Now</h2>
          <p>Final motivation or info for users.</p>
        </div>
      </Slider>
    </div>
  );
};

export default StorySplashScreen
