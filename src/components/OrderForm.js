import React, { useState, useEffect } from 'react';
import { IoWarningSharp } from 'react-icons/io5';
import $ from 'jquery';
import FlavorSelection from './FlavorSelection';
import SizeSelection from './SizeSelection';
import FrostingFlavor from './FrostingFlavor';
import chocolateCake from '../images/cake_flavors/chocolate_cake.jpg';
import whiteCake from '../images/cake_flavors/white_cake.jpg';
import redVelvetCake from '../images/cake_flavors/red_velvet.jpg';
import carrotCake from '../images/cake_flavors/carrot_cake.jpg';
import '../css/OrderForm.css';

function OrderForm() {
  const [flavor, setFlavor] = useState('');
  const [size, setSize] = useState('');
  const [recommendedSize, setRecommendedSize] = useState('');
  const [userSize, setUserSize] = useState(false);
  const [anBool, setAnBool] = useState(false);
  const [frosting, setFrosting] = useState('');

  const navOrder = [
    'tier-selector',
    'people-count',
    'size-selector',
    'flavor-wrapper',
    'frosting-selector',
    'filling-selector',
    'submit-order',
  ];

  const cakeSizes = [12, 24, 30, 35, 50];

  useEffect(() => {
    var url = new URLSearchParams(window.location.search);
    // alert(url.get('flavor'));
  });

  window.addEventListener('beforeunload', (ev) => {
    ev.preventDefault();
    return (ev.returnValue = 'Are you sure you want to close?');
  });

  const setState = (newFlavor) => {
    setFlavor(newFlavor);
  };

  const setFrostState = (newFrostFlav) => {
      setFrosting(newFrostFlav);
  };

  const userSetSize = (newSize) => {
    if (!$('.num-sel').hasClass(size)) {
      setSize(newSize);
      setUserSize(true);
    }
  };

  const closestValue = (v) => {
    let roundedVal;

    for (let i = 0; i < cakeSizes.length; i++) {
      if (cakeSizes[i] >= v) {
        roundedVal = cakeSizes[i];
        break;
      }
    }
    return roundedVal;
  };

  const calcCakeSize = () => {
    const num = closestValue($('.head-count-input').val());
    let curSize;
    switch (num) {
      case 12:
        curSize = '6';
        break;
      case 24:
        curSize = '8';
        break;
      case 30:
        curSize = '9';
        break;
      case 35:
        curSize = '10';
        break;
      case 50:
        curSize = '12';
        break;
    }
    if (curSize === '8') {
      setAnBool(true);
    } else {
      setAnBool(false);
    }
    $('.num-sel').removeClass('num-sel');
    setRecommendedSize(curSize);
    setSize(curSize);
    setTimeout(() => {
      $(`.${curSize}`).addClass('num-sel');
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(flavor);
  };

  const handleNextEnable = (e) => {
    if (e.target.value === '') {
      $('.next-button').addClass('button-disabled');
    } else {
      setUserSize(false);
      $('.next-button').removeClass('button-disabled');
    }
  };

  const handleNext = (e) => {
    const goNext = () => {
      const curNav = $('.current');
      const nextNavInd =
        navOrder.indexOf(curNav.attr('class').split(' ')[0]) + 1;
      const nextNav = $('.' + navOrder[nextNavInd]);

      $('.current').removeClass('current');
      setTimeout(() => {
        nextNav.addClass('current');
      }, 500);
    };

    const curHolder = $('.current');
    if (curHolder.hasClass('people-count')) {
      if ($('.head-count-input').val() === '') {
        $('.count-error').addClass('vis-error');
        return;
      } else {
        if (userSize === false) {
          calcCakeSize();
          setTimeout(() => {
            $('.prev-button').css('visibility', 'visible');
            setTimeout(() => {
              $('.prev-button').removeClass('hidden');
            }, 20);
          }, 500);
        }
        goNext();
      }
    } else {
      goNext();
    }
  };

  const handlePrev = (e) => {
    const curHolder = $('.current');
    if (curHolder.hasClass('size-selector')) {
      $('.prev-button').addClass('hidden');
      $('.prev-button').css('visibility', 'hidden');
    }
    const curNav = $('.current');
    const prevNavInd = navOrder.indexOf(curNav.attr('class').split(' ')[0]) - 1;
    const prevNav = $('.' + navOrder[prevNavInd]);
    $('.current').removeClass('current');
    setTimeout(() => {
      prevNav.addClass('current');
    }, 500);
  };

  return (
    <div className='form-div'>
      <form className='order-form' id='order-form'>
        <div className='people-count form-page current'>
          <h4 className='people-count-head'>
            1. How many people are you serving?
          </h4>
          <div className='count-wrapper'>
            <input
              type='text'
              className='head-count-input'
              onChange={handleNextEnable}
            ></input>
          </div>
          <div className='count-error'>
            <IoWarningSharp />
            <span>Please enter a number.</span>
          </div>
        </div>
        <div className='size-selector form-page'>
          <div className='size-header-wrap  '>
            <h4 className='size-head'>2. Select a size</h4>
            <div className='size-suggestion'>{`For ${$(
              '.head-count-input'
            ).val()} people we recommend ${
              anBool ? 'an' : 'a'
            } ${recommendedSize} inch cake.`}</div>
          </div>
          <div className='size-boxes'>
            <SizeSelection size='6' setState={userSetSize} />
            <SizeSelection size='8' setState={userSetSize} />
            <SizeSelection size='9' setState={userSetSize} />
            <SizeSelection size='10' setState={userSetSize} />
            <SizeSelection size='12' setState={userSetSize} />
          </div>
        </div>
        <div className='flavor-wrapper form-page'>
          <h4 className='flavor-header'>3. Select a cake flavor</h4>
          <div className='flavor-selector'>
            <FlavorSelection
              className='chocolate'
              flavor='Chocolate'
              imageUrl={chocolateCake}
              setState={setState}
            />
            <FlavorSelection
              className='vanilla'
              flavor='Vanilla'
              imageUrl={whiteCake}
              setState={setState}
            />
            <FlavorSelection
              className='red-velvet'
              flavor='Red Velvet'
              imageUrl={redVelvetCake}
              setState={setState}
            />
            <FlavorSelection
              className='carrot-cake'
              flavor='Carrot Cake'
              imageUrl={carrotCake}
              setState={setState}
            />
          </div>
        </div>
        <div className='frosting-selector form-page'>
          <div className='frosting-wrapper'>
            <h4 className='frosting-head'>4. Select a frosting flavor</h4>
            <div className='frosting-selector'>
              <FrostingFlavor
                className='chocolate'
                flavor='Chocolate'
                imageUrl={chocolateCake}
                setState={setFrostState}
              />
              <FrostingFlavor
                className='buttercream'
                flavor='Buttercream'
                imageUrl={whiteCake}
                setState={setFrostState}
              />
              <FrostingFlavor
                className='bb-cream-cheese'
                flavor='Cream Cheese'
                imageUrl={whiteCake}
                setState={setFrostState}
              />
            </div>
          </div>
        </div>
        {/* <input type='submit' onClick={handleSubmit} /> */}
      </form>
      <div className='form-nav'>
        <button
          className='prev-button form-butt button-disabled hidden'
          onClick={handlePrev}
          style={{ visibility: 'hidden' }}
        >
          Previous
        </button>
        <button
          className='next-button form-butt button-disabled'
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OrderForm;
