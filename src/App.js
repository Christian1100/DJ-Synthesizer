import './App.css';
import UploadingVideo from "./UploadingVideo";
import AudioTestButton from './AudioTestButton';
import Equalizer from './gui/Equalizer/Equalizer';
import { useRef } from 'react';
import Synthesizer from './Synthesizer';

function App() {
  const synthesizer = useRef(new Synthesizer());
  
  return (
    <div className="App">
      <header className="App-header">
        <AudioTestButton synthesizer={synthesizer.current} />
        <Equalizer synthesizer={synthesizer.current} />
        <UploadingVideo />
      </header>
    </div>
  );
}

export default App;