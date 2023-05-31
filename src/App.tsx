import React from 'react';
import logo from './logo.svg';
import './App.css';
import Charsheet from './components/Charsheet';
import actors from 'foundry-testing-data/actors';

function App() {
  const character = actors.find(x => x.name === 'Drake Croft (oddih edition)');
  console.log('found character:', character);

  return (
    <div className="App">
      {/* <header className="App-header">
        Charsheet loader pls here
      </header> */}
      <div className="main-content">
        <Charsheet character={character} />
      </div>
    </div>
  );
}

export default App;
