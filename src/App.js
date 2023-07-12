import './App.css';
import UploadingVideo from "./UploadingVideo";
import AudioTestButton from './AudioTestButton';
import Equalizer from './gui/Equalizer/Equalizer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AudioTestButton />
        <Equalizer />
        <UploadingVideo />
      </header>
    </div>
  );
}

export default App;