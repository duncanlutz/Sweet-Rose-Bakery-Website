import React, { useState, useEffect } from 'react';
import { IoWarningSharp } from 'react-icons/io5';
import $ from 'jquery';
import FlavorSelection from './FlavorSelection';
import SizeSelection from './SizeSelection';
import TwoTierSizeSelection from './TwoTierSizeSelection';
import FrostingFlavor from './FrostingFlavor';
import TierSelector from './TierSelector';
import '../css/OrderForm.css';

function OrderForm() {
  const [tier, setTier] = useState('');
  const [flavor, setFlavor] = useState('');
  const [size, setSize] = useState('');
  const [recommendedSize, setRecommendedSize] = useState('');
  const [userSize, setUserSize] = useState(false);
  const [anBool, setAnBool] = useState(false);
  const [frosting, setFrosting] = useState('');
  const [filling, setFilling] = useState('');

  const cakeSizes = [12, 24, 30, 35, 50];
  const twoTierSizes = [42, 59, 74];

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

  const setFillState = (newFillFlav) => {
    setFilling(newFillFlav);
  };

  const setTierState = (newTier) => {
    setTier(newTier);
  };

  const userSetSize = (newSize) => {
    if (!$('.num-sel').hasClass(size)) {
      setSize(newSize);
      setUserSize(true);
    }
  };

  const userSetTwoTierSize = (newSize) => {
    if (!$('.num-sel').hasClass(size)) {
      setSize(newSize);
      setUserSize(true);
    }
  };

  const closestValue = (arr, v) => {
    let roundedVal;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= v) {
        roundedVal = arr[i];
        break;
      }
    }
    return roundedVal;
  };

  const calcCakeSize = () => {
    if ($('.two-tier').hasClass('invis')) {
      const num = closestValue(cakeSizes, $('.head-count-input').val());
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
    } else if ($('.one-tier').hasClass('invis')) {
      const num = closestValue(twoTierSizes, $('.head-count-input').val());
      let curSize;
      switch (num) {
        case 42:
          curSize = '6_9';
          break;
        case 59:
          curSize = '8_10';
          break;
        case 74:
          curSize = '10_12';
          break;
      }
      if (curSize === '8_10') {
        setAnBool(true);
      } else {
        setAnBool(false);
      }
      $('.num-sel').removeClass('num-sel');
      const curSizeName = curSize.replace('_', ' & ');
      setRecommendedSize(curSizeName);
      setSize(curSizeName);
      setTimeout(() => {
        $(`.${curSize + '-inch'}`).addClass('num-sel');
      }, 100);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(flavor);
  };

  const handleNext = (e) => {
    const goNext = () => {
      const curNav = $('.current');
      const nextNav = curNav.next();
      $('.current').removeClass('current');
      setTimeout(() => {
        nextNav.addClass('current');
      }, 500);
    };

    const curHolder = $('.current');
    if (curHolder.hasClass('tier-wrapper')) {
      if ($('.tier-sel').length === 0) {
        $('.tier.error').addClass('vis-error');
      } else {
        $('.tier.error').removeClass('vis-error');
        setTimeout(() => {
          $('.prev-button').css('visibility', 'visible');
          setTimeout(() => {
            $('.prev-button').removeClass('hidden');
          }, 20);
        }, 500);
        goNext();
      }
    } else if (curHolder.hasClass('people-count')) {
      if (
        $('.head-count-input').val() === '' ||
        isNaN($('.head-count-input').val())
      ) {
        $('.count.error').addClass('vis-error');
      } else {
        if ($('.tier-sel').hasClass('one')) {
          $('.invis').removeClass('invis');
          $('.size-boxes.two-tier').addClass('invis');
        } else if ($('.tier-sel').hasClass('two')) {
          $('.invis').removeClass('invis');
          $('.size-boxes.one-tier').addClass('invis');
        }
        $('.count.error').removeClass('vis-error');
        if (userSize === false) {
          calcCakeSize();
        }
        goNext();
      }
    } else if (curHolder.hasClass('size-selector')) {
      if ($('.num-sel').length === 0) {
        $('.size.error').addClass('vis-error');
      } else {
        $('.size.error').removeClass('vis-error');
        goNext();
      }
    } else if (curHolder.hasClass('flavor-wrapper')) {
      if ($('.selected').length === 0) {
        $('.flavor.error').addClass('vis-error');
      } else {
        $('.flavor.error').removeClass('vis-error');
        goNext();
      }
    } else if (curHolder.hasClass('frosting-selector')) {
      if ($('.frost-sel').length === 0) {
        $('.fros.error').addClass('vis-error');
      } else {
        $('.fros.error').removeClass('vis-error');
        goNext();
      }
    } else {
      goNext();
    }
  };

  const handlePrev = (e) => {
    const goPrev = () => {
      const curNav = $('.current');
      const prevNav = curNav.prev();
      $('.current').removeClass('current');
      setTimeout(() => {
        prevNav.addClass('current');
        const curHolder = $('.current');
        if (curHolder.hasClass('tier-wrapper')) {
          $('.prev-button').addClass('hidden');
          $('.prev-button').css('visibility', 'hidden');
        }
      }, 500);
    };

    goPrev();
  };

  return (
    <div className='form-div'>
      <form className='order-form' id='order-form'>
        <div className='tier-wrapper form-page current'>
          <h4 className='tier-head'>1. How many tiers do you want?</h4>
          <div className='tier-box'>
            <TierSelector
              className='one'
              flavor='One'
              setState={setTierState}
            />
            <TierSelector
              className='two'
              flavor='Two'
              setState={setTierState}
            />
          </div>
          <div className='tier error'>
            <IoWarningSharp />
            <span>Please select a tier amount.</span>
          </div>
        </div>
        <div className='people-count form-page'>
          <h4 className='people-count-head'>
            2. How many people are you serving?
          </h4>
          <div className='count-wrapper'>
            <input type='text' className='head-count-input'></input>
          </div>
          <div className='count error'>
            <IoWarningSharp />
            <span>Please enter a number.</span>
          </div>
        </div>
        <div className='size-selector form-page'>
          <div className='size-header-wrap  '>
            <h4 className='size-head'>3. Select a size</h4>
            <div className='size-suggestion'>{`For ${$(
              '.head-count-input'
            ).val()} people we recommend ${
              anBool ? 'an' : 'a'
            } ${recommendedSize} inch cake.`}</div>
          </div>
          <div className='size-boxes one-tier'>
            <SizeSelection size='6' setState={userSetSize} />
            <SizeSelection size='8' setState={userSetSize} />
            <SizeSelection size='9' setState={userSetSize} />
            <SizeSelection size='10' setState={userSetSize} />
            <SizeSelection size='12' setState={userSetSize} />
          </div>
          <div className='size-boxes two-tier'>
            <TwoTierSizeSelection
              sizeone='6'
              sizetwo='9'
              setState={userSetTwoTierSize}
            />
            <TwoTierSizeSelection
              sizeone='8'
              sizetwo='10'
              setState={userSetTwoTierSize}
            />
            <TwoTierSizeSelection
              sizeone='8'
              sizetwo='12'
              setState={userSetTwoTierSize}
            />
            {/* 12-8
            10-8
            9-6 */}
          </div>
          <div className='size error'>
            <IoWarningSharp />
            <span>Please select a cake size.</span>
          </div>
        </div>
        <div className='flavor-wrapper form-page'>
          <h4 className='flavor-header'>4. Select a cake flavor</h4>
          <div className='flavor-selector'>
            <FlavorSelection
              className='chocolate'
              flavor='Chocolate'
              setState={setState}
            />
            <FlavorSelection
              className='vanilla'
              flavor='Vanilla'
              setState={setState}
            />
            <FlavorSelection
              className='red-velvet'
              flavor='Red Velvet'
              setState={setState}
            />
            <FlavorSelection
              className='carrot-cake'
              flavor='Carrot Cake'
              setState={setState}
            />
          </div>
          <div className='flavor error'>
            <IoWarningSharp />
            <span>Please select a cake flavor.</span>
          </div>
        </div>
        <div className='frosting-selector form-page'>
          <div className='frosting-wrapper'>
            <h4 className='frosting-head'>5. Select a frosting flavor</h4>
            <div className='frosting-selector'>
              <FrostingFlavor
                className='chocolate-buttercream'
                flavor='Chocolate Buttercream'
                setState={setFrostState}
              />
              <FrostingFlavor
                className='vanilla-buttercream'
                flavor='Vanilla Buttercream'
                setState={setFrostState}
              />
              <FrostingFlavor
                className='chocolate-ganache'
                flavor='Chocolate Ganache'
                setState={setFrostState}
              />
              <FrostingFlavor
                className='bb-cream-cheese'
                flavor='Cream Cheese'
                setState={setFrostState}
              />
            </div>
            <div className='fros error'>
              <IoWarningSharp />
              <span>Please select a frosting flavor.</span>
            </div>
          </div>
        </div>
        <div className="design-wrapper form-page">
        <h4 className='design-head'>6. Enter your design preferences</h4>
          <div className="design-box">
            <textarea className="design-input" />
          </div>
        </div>
        <div className='order-review form-page'>
          <h4 className='review-head'>7. Review your order</h4>
          <div className='review-box'>
            <div className='cake-size'>
              <h5 className='size-info'>Size</h5>
              <span>Tiers: {$('.tier-sel').text()}</span>
              <span>Size: {$('.num-sel').text()}</span>
            </div>
            <div className='cake-flavors'>
              <h5 className='cake-flav-head'>Flavors</h5>
              <span>Cake: {$('.selected').text()}</span>
              <span>Frosting: {$('.frost-sel').text()}</span>
            </div>
            <div className="design-review">
              <h5 className="des-info">
                Design
              </h5>
              <span>{$('.design-input').val()}</span>
            </div>
            <div className='price-estimate'></div>
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
