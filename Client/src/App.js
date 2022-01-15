import logo from './logo.svg';
import './App.scss';
import { useState, useEffect } from 'react';
import HomePage from './Components/HomePage/HomePage';
import Logo from './Components/Logo/Logo';
import Player from './Components/Player/Player';
const App = () => {


  return (

    <div className='appContainer'>
      <Logo></Logo>
      {/* <HomePage></HomePage> */ }
      <Player></Player>

    </div>
  );
};

export default App;
