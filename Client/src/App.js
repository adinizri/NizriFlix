import logo from './logo.svg';
import './App.scss';
import miniLogo from '../src/Images/NizriFlix_Mini_Logo.png';
import { createContext, useState, useEffect, useContext, useMemo } from 'react';

import Logo from './Components/SharedComponents/Logo/Logo';
import Movies from './Components/Pages/Movies/Movies';
import { videoData } from './Contexts/Contexts';
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {

  return (

    <Router>

      <div className='appContainer'>


        <ul >
          <il >
            <Link to="/HomePage"><img src={ miniLogo }></img></Link>

          </il>
          <li>
            <Link to="/Movies">Movies</Link>
          </li>
          <li>
            <Link to="/HomePage">HomePage</Link>
          </li>
          <li>
            <Link to="/Series">Series</Link>
          </li>

        </ul>
        <Routes>
          <Route exact path='/Movies' element={ < Movies /> }></Route>

        </Routes>


      </div>
    </Router >



  );
};

export default App;
{/* <div className='appContainer'>

      { playing ? <Player data={ data } ></Player> :
        <videoData.Provider value={ { setPlaying: setPlaying, setData: setData } }><CarouselContainer ></CarouselContainer> </videoData.Provider> }


    </div> */}