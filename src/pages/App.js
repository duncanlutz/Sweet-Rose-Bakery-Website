import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from './Home';
import '../css/App.css';
import Order from './Order';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/order' element={<Order />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
