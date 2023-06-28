import './App.css';
import UploadingVideo from "./UploadingVideo";
import AudioTestButton from './AudioTestButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AudioTestButton />
        <UploadingVideo />
      </header>
    </div>
  );
}

export default App;