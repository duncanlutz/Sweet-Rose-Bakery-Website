import React from 'react';
import OrderForm from '../components/OrderForm';
import '../css/OrderPage.css';

function Order(props) {
  return (
    <div className='order-page'>
      <h3 className='order-header'>Order</h3>
      <div className='order-form-wrapper'>
        <OrderForm />
      </div>
    </div>
  );
}

export default Order;
