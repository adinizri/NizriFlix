import logo from './logo.svg';
import './App.scss';
import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import CarouselContainer from './Components/SharedComponents/CarouselContainer/CarouselContainer';
import Logo from './Components/SharedComponents/Logo/Logo';
import Player from './Components/SharedComponents/Player/Player';
import { Router } from 'react-router-dom';


export const playerContext = createContext();//create context
const App = () => {
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState();



  const isPlaying = () => {
    setPlaying(true);
  };
  const getData = (data) => {
    setData(data);
  };
  return (<>
    <Logo></Logo>
    {/* <Router>
      <nav>
        <Link to="/Movies">My Profile</Link>
        <br />
        <Link to={ `/profile/ann` }>Ann's Profile</Link>
      </nav>
      <Route path="/profile">
        <Profile />
      </Route>
    </Router> */}

    <div className='appContainer'>

      { playing ? <Player data={ data } ></Player> :
        <playerContext.Provider value={ setPlaying }><CarouselContainer isPlaying={ isPlaying } getData={ getData }></CarouselContainer> </playerContext.Provider> }


    </div>
  </>
  );
};

export default App;
