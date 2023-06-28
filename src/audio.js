const WAVE_LENGTH = 200;

export function playAudio() {
	const context = new AudioContext();
	
	const buffer = context.createBuffer(1, context.sampleRate * 3, context.sampleRate);
	const bufferB = context.createBuffer(1, context.sampleRate * 3, context.sampleRate);
	
	const data = buffer.getChannelData(0);
	const dataB = bufferB.getChannelData(0);
	
	for (let i = 0; i < data.length; i++) {
		// create square wave
		data[i] = i % WAVE_LENGTH < WAVE_LENGTH / 2 ? -1 : 1;
		dataB[i] = i % (WAVE_LENGTH / 2) < WAVE_LENGTH / 4 ? -1 : 1;
	}
	
	const source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	
	const sourceB = context.createBufferSource();
	sourceB.buffer = bufferB;
	sourceB.connect(context.destination);
	
	source.start();
	sourceB.start(3);
}