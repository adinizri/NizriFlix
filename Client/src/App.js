import logo from './logo.svg';
import './App.scss';
import { useState, useEffect } from 'react';
import HomePage from './Components/HomePage/HomePage';
import Logo from './Components/Logo/Logo';
const App = () => {


  return (

    <div className='appContainer'>
      <Logo></Logo>
      <HomePage></HomePage>

    </div>
  );
};

export default App;
