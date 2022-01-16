import React, { useEffect } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import cookiePic from '../images/cookie-td.jpeg';
import StoreItem from '../components/StoreItem';
import $ from 'jquery';
import '../css/Home.css';

function Home() {
  useEffect(() => {
    changeImage();
  }, []);

  let sliderTimer;

  const changeSlider = (e) => {
    if (!e.target.classList.contains('act-slider')) {
      $('.act-slider').removeClass('act-slider');
      e.target.classList.add('act-slider');
      clearTimeout(sliderTimer);
      if (e.target.classList.contains('btn-one')) {
        $('.act-slide-image').removeClass('act-slide-image');
        $('.slide-image.one').toggleClass('act-slide-image');
        changeImage();
      } else if (e.target.classList.contains('btn-two')) {
        $('.act-slide-image').removeClass('act-slide-image');
        $('.slide-image.two').toggleClass('act-slide-image');
        changeImage();
      } else if (e.target.classList.contains('btn-three')) {
        $('.act-slide-image').removeClass('act-slide-image');
        $('.slide-image.three').toggleClass('act-slide-image');
        changeImage();
      }
    }
  };

  const changeImage = () => {
    sliderTimer = setTimeout(() => {
      if ($('.slider.btn-one').hasClass('act-slider')) {
        $('.slider.btn-one').toggleClass('act-slider');
        $('.slider.btn-two').toggleClass('act-slider');
        $('.slide-image.one').toggleClass('act-slide-image');
        $('.slide-image.two').toggleClass('act-slide-image');
      } else if ($('.slider.btn-two').hasClass('act-slider')) {
        $('.slider.btn-two').toggleClass('act-slider');
        $('.slider.btn-three').toggleClass('act-slider');
        $('.slide-image.two').toggleClass('act-slide-image');
        $('.slide-image.three').toggleClass('act-slide-image');
      } else if ($('.slider.btn-three').hasClass('act-slider')) {
        $('.slider.btn-three').toggleClass('act-slider');
        $('.slider.btn-one').toggleClass('act-slider');
        $('.slide-image.three').toggleClass('act-slide-image');
        $('.slide-image.one').toggleClass('act-slide-image');
      }
      changeImage();
    }, 5000);
  };

  return (
    <div className='home'>
      <div className='header-slider'>
        <div className='header-text-cont'>
          <div className='header-wrapper'><span className='header-text'>Make life</span><span className="header-text-script">sweet</span></div>
        </div>
        <div className='slider-buttons'>
          <div className='slider btn-one act-slider' onClick={changeSlider}>
            <div className='slide-filled'></div>
          </div>
          <div className='slider btn-two' onClick={changeSlider}>
            <div className='slide-filled'></div>
          </div>
          <div className='slider btn-three' onClick={changeSlider}>
            <div className='slide-filled'></div>
          </div>
        </div>
        <div className='slide-image one act-slide-image'></div>
        <div className='slide-image two'></div>
        <div className='slide-image three'></div>
      </div>
      <div className="our-faves">
        <h3 className='favs-header'>
          Our Faves
        </h3>
        <div className="home-store">
          <StoreItem id='1' itemName='Oatmeal Chocolate Chip Cookies' imageUrl={cookiePic}/>
          <StoreItem id='1' itemName='Oatmeal Chocolate Chip Cookies' imageUrl={cookiePic}/>
          <StoreItem id='1' itemName='Oatmeal Chocolate Chip Cookies' imageUrl={cookiePic}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
