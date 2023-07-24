import './App.css';
import UploadingVideo from "./UploadingVideo";
import AudioTestButton from './AudioTestButton';
import Gui from "./gui/Gui";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AudioTestButton />
        <UploadingVideo />
        <Gui/>
      </header>
    </div>
  );
}

export default App;
