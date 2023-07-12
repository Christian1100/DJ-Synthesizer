const WAVE_LENGTH = 440;
const VOLUME = 0.1;
const EQ_FREQUENCIES = [30, 60, 120, 250, 500, 1000, 2000, 4000, 8000, 16000];

export default class Synthesizer {
	init() {
		if (this.isInit)
			return;
		
		this.context = new AudioContext();
		
		const gain = this.context.createGain();
		gain.gain.value = VOLUME;
		gain.connect(this.context.destination);
		
		this.eqNodes = [];
		let previousNode = gain;
		
		for (let i = 0; i < EQ_FREQUENCIES.length; i++) {
			const node = this.context.createBiquadFilter();
			
			if (i === 0) {
				node.type = "lowshelf";
			} else if (i === EQ_FREQUENCIES.length - 1) {
				node.type = "highshelf";
			} else {
				node.type = "peaking";
				node.Q.setValueAtTime(1.25, this.context.currentTime); // TODO figure out proper Q value using spectrum analyzer and white noise
			}
			
			node.frequency.setValueAtTime(EQ_FREQUENCIES[i], this.context.currentTime);
			node.connect(previousNode);
			
			previousNode = node;
			this.eqNodes[i] = node;
		}
		
		this.destination = previousNode;
		
		this.isInit = true;
	}
	
	playAudio() {
		this.init();
		
		const oscillator = this.context.createOscillator();
		oscillator.type = "sawtooth";
		oscillator.frequency.setValueAtTime(WAVE_LENGTH, this.context.currentTime);
		oscillator.connect(this.destination);
		oscillator.start();
	}
	
	setEqualizer(index, value) {
		const node = this.eqNodes[index];
		
		node.gain.setValueAtTime(value * 50 - 25, this.context.currentTime);
		console.log(node.gain.value);
	}
}