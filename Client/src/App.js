import logo from './logo.svg';
import './App.scss';
import { useState, useEffect } from 'react';

const App = () => {
  const [serverSide, setTest] = useState();
  useEffect(() => {
    fetch('/movies').then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(jsonResponse => {
      console.log(jsonResponse);
      setTest(jsonResponse);

    });
  }, []);


  return (
    serverSide ?
      <div className="App">
        <header className="App-header">
          {/* <img src={ logo } className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
          <p>{ JSON.stringify(serverSide) }</p>
        </header>
      </div> : null
  );
};

export default App;
