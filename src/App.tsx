import React, { useState } from 'react';
import './App.css';
import Charsheet from './components/Charsheet';

function App() {

  const [character, setCharacter] = useState(undefined as any);

  const loadCharacter = async (fileChangeEvent: any) => {
    const file = fileChangeEvent.target.files[0];
    console.log('loaded file!:', file);
    console.log('?', file, fileChangeEvent)

    const char = await new Promise((resolve: (x : any) => void, reject: (x?: any) => void) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(JSON.parse(fileReader.result as string));
      };
      fileReader.readAsText(file);
    });
    console.log('read character data:', char)
    setCharacter(char);
  }

  return (
    <div className="App flex flex-col">
      {/* <header className="App-header">
        Charsheet loader pls here
      </header> */}
      { character && character.items ?
        <div className="main-content">
          <Charsheet character={character} />
        </div> : <>
          <div>Select charsheet</div>
          <input type="file" onChange={loadCharacter}/>
        </>
      }
    </div>
  );
}

export default App;
