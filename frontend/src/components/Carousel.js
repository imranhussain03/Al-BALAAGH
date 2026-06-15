import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/carousel1.jpg',
      title: 'Uplifting the Ummah',
      description: 'Helping people is the core of our community and mission',
      link: 'https://www.alphagamma.eu/entrepreneurship/3-reasons-helping-people-good-business/'
    },
    {
      image: '/carousel2.jpg',
      title: 'Education & Growth',
      description: 'Providing quality Islamic and modern learning opportunities',
      link: 'https://www.indiatoday.in/lifestyle/wellness/story/its-now-been-proven-that-helping-others-will-make-you-feel-better-277316-2015-12-15'
    },
    {
      image: '/carousel3.jpg',
      title: 'Giving a Helping Hand',
      description: 'Supporting individuals and families to build a better future',
      link: 'https://cmo.org.ng/giving-helping-hand-those-in-need-20/'
    },
    {
      image: '/carousel4.jpg',
      title: 'Community Support',
      description: 'Interactive volunteer work and charitable initiatives',
      link: '/join'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Increased interval to 8 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg group">
      {slides.map((slide, index) => {
        const isExternal = slide.link.startsWith('http');
        const SlideWrapper = isExternal ? 'a' : Link;
        const wrapperProps = isExternal 
          ? { href: slide.link, target: '_blank', rel: 'noopener noreferrer' } 
          : { to: slide.link };

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <SlideWrapper {...wrapperProps} className="block w-full h-full relative cursor-pointer">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full group-hover:scale-[1.02] transition-transform duration-[8000ms] ${
                  index === 3 ? 'object-contain bg-gray-950' : 
                  index === 0 ? 'object-cover object-top' : 
                  'object-cover object-center'
                }`}
              />
              {/* Subtle dark overlay to ensure text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-35 group-hover:bg-opacity-25 transition-all duration-300" />
            </SlideWrapper>
          </div>
        );
      })}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;