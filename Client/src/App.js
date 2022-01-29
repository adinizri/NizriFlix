import logo from './logo.svg';
import './App.scss';
import { useState, useEffect } from 'react';
import HomePage from './Components/Pages/HomePage/HomePage';
import Logo from './Components/SharedComponents/Logo/Logo';
import Player from './Components/SharedComponents/Player/Player';
const App = () => {
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState();


  const isPlaying = () => {
    setPlaying(true);
  };
  const getData = (data) => {
    setData(data);
  };
  return (

    <div className='appContainer'>
      <Logo></Logo>
      { playing ? <Player data={ data } ></Player> : <><HomePage isPlaying={ isPlaying } getData={ getData }></HomePage> </> }


    </div>
  );
};

export default App;
