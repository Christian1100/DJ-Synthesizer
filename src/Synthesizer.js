const VOLUME = 0.1;
const EQ_FREQUENCIES = [30, 60, 120, 250, 500, 1000, 2000, 4000, 8000, 16000];
// source: https://pages.mtu.edu/~suits/notefreqs.html
// starting at C1
const NOTE_FREQUENCIES = [
	65.41, 69.30, 73.42, 77.78, 82.41, 87.31, 92.50, 98.00, 103.83, 110.00, 116.54, 123.47,
	130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00, 233.08, 246.94,
	261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88,
	523.25,
];

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
		this.noteOscillators = [];
		
		for (let i = 0; i < NOTE_FREQUENCIES.length; i++) {
			this.noteOscillators[i] = null;
		}
		
		this.attack = 0;
		this.decay = 0;
		this.sustain = 0;
		this.release = 0;
		
		this.isInit = true;
	}
	
	startNote(index) {
		this.init();
		
		if (this.noteOscillators[index] !== null) {
			return;
		}
		
		this.stopNote(index);
		
		const frequency = NOTE_FREQUENCIES[index];
		
		const oscillator = this.context.createOscillator();
		oscillator.type = "sawtooth";
		oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
		
		const gain = this.context.createGain();
		gain.gain.setValueAtTime(0, this.context.currentTime);
		gain.gain.linearRampToValueAtTime(1, this.context.currentTime + this.attack);
		gain.gain.linearRampToValueAtTime(this.sustain / 100, this.context.currentTime + this.attack + this.decay);
		gain.gain.linearRampToValueAtTime(0, this.context.currentTime + this.attack + this.decay + this.release);
		
		gain.connect(this.destination);
		oscillator.connect(gain);
		oscillator.start();
		
		this.noteOscillators[index] = oscillator;
	}
	
	stopNote(index) {
		this.init();
		
		const oscillator = this.noteOscillators[index];
		
		if (oscillator === null) {
			return;
		}
		
		oscillator.stop();
		this.noteOscillators[index] = null;
	}
	
	setEqualizer(index, value) {
		this.init();
		
		const node = this.eqNodes[index];
		
		node.gain.setValueAtTime(value * 50 - 25, this.context.currentTime);
	}
	
	setAttack(value) {
		console.log("Attack: " + value);
		
		this.attack = value;
	}
	
	setDecay(value) {
		console.log("Decay: " + value);
		
		this.decay = value;
	}
	
	setSustain(value) {
		console.log("Sustain: " + value);
		
		this.sustain = value;
	}
	
	setRelease(value) {
		console.log("Release: " + value);
		
		this.release = value;
	}
}