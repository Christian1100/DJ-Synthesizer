const AudioTestButton = ({synthesizer}) => {
	const onClick = () => {
		synthesizer.playAudio();
	}
	
	return <button onClick={onClick}>Play Test-Audio</button>;
}

export default AudioTestButton;
