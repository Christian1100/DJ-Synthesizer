import './App.css';
import UploadingVideo from "./video/UploadingVideo";
import Gui from "./gui/Gui";
import Equalizer from './gui/Equalizer/Equalizer';
import { useEffect, useRef } from 'react';
import Synthesizer from './Synthesizer';

function getNoteForKeyCode(keyCode) {
  switch (keyCode) {
    case 90: // Z
      return 0;
    case 83: // S
      return 1;
    case 88: // X
      return 2;
    case 68: // D
      return 3;
    case 67: // C
      return 4;
    case 86: // V
      return 5;
    case 71: // G
      return 6;
    case 66: // B
      return 7;
    case 72: // H
      return 8;
    case 78: // N
      return 9;
    case 74: // J
      return 10;
    case 77: // M
      return 11;
    case 188: // ,
      return 12;
    case 76: // L
      return 13;
    case 190: // .
      return 14;
    case 59: // ;
      return 15;
    case 191: // /
      return 16;
  }

  return null;
}


function App() {
  const synthesizer = useRef(new Synthesizer());

  function handleKeydown(event) {
    const note = getNoteForKeyCode(event.keyCode);

    if (note === null) {
      return;
    }

    synthesizer.current.startNote(note);
  }

  function handleKeyup(event) {
    const note = getNoteForKeyCode(event.keyCode);

    if (note === null) {
      return;
    }

    synthesizer.current.stopNote(note);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
  });

  return (
    <div className="App">
      <header className="App-header">
        <Gui synthesizer={synthesizer.current}/>
      </header>
    </div>
  );
}

export default App;
