import logo from './logo.svg';
import './App.scss';
import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import CarouselContainer from './Components/SharedComponents/CarouselContainer/CarouselContainer';
import Logo from './Components/SharedComponents/Logo/Logo';
import Player from './Components/SharedComponents/Player/Player';
import { Router } from 'react-router-dom';
import { videoData } from './Contexts/Contexts';


const App = () => {
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState();




  // const isPlaying = () => {
  //   setPlaying(true);
  // };
  // const getData = (data) => {
  //   setData(data);
  // };
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
        <videoData.Provider value={ { setPlaying: setPlaying, setData: setData } }><CarouselContainer ></CarouselContainer> </videoData.Provider> }


    </div>
  </>
  );
};

export default App;
