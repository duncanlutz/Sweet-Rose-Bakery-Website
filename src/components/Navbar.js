import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { IoCartSharp, IoMenuSharp, IoCloseSharp } from 'react-icons/io5';
import '../css/Navbar.css';

function Navbar() {

  const navigate = useNavigate();

  const handleButton = () => {
    $('.side-menu').toggleClass('active-menu');
    $('body').css('position', 'fixed');
  };

  const closeMenu = () => {
    $('.side-menu').removeClass('active-menu');
    $('body').removeAttr('style');
  };

  const handleNav = (l) => {
      closeMenu();
      navigate(`/${l}`);
  }

  return (
    <nav>
      <div className='desk-nav'>
        <Link to='/'>
          <div className='logo'></div>
        </Link>
        <div className='link-wrapper'>
          <div className='nav-links'>
            <Link to='/shop'>
              <button className='shop nav-btn'>Shop</button>
            </Link>
            <Link to='/order'>
              <button className='order nav-btn'>Order</button>
            </Link>
            <Link to='/about'>
              <button className='about nav-btn'>Our Story</button>
            </Link>
          </div>
          <div className='end-icons'>
            <Link to='/cart'>
              <button className='cart nav-btn'>
                <IoCartSharp size='20' />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='mob-nav'>
      <Link to='/'><div className='logo mobile'></div></Link>
        <div className='burger-menu' onClick={handleButton}>
          <IoMenuSharp size='20' />
        </div>
      </div>
      <div className='side-menu'>
        <div className='side-close-menu' onClick={closeMenu}>
          <IoCloseSharp size='20' />
        </div>
        <div className='nav-links mobile'>
            <div className='shop mobile nav-btn' onClick={() => { handleNav('shop') }}>Shop</div>
            <div className='order mobile nav-btn' onClick={() => { handleNav('order') }}>Order</div>
            <button className='about mobile nav-btn' onClick={() => { handleNav('about') }}>Our Story</button>
          <div className='end-icons mobile'>
              <button className='cart nav-btn' onClick={() => { handleNav('cart') }}>
                <IoCartSharp size='30' className='cart-icon' />
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
