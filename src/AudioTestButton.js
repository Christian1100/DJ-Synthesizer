import {playAudio} from './audio.js';

export default function AudioTestButton() {
	return <button onClick={playAudio}>Play Test-Audio</button>;
}