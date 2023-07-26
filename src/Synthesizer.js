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

class Note {
	constructor(context, destination, frequency) {
		this.context = context;
		this.destination = destination;
		this.frequency = frequency;
		this.oscillator = null;
		this.gain = null;
		this.isStarted = false;
	}
	
	play(attack, decay, sustain, release) {
		if (this.isStarted) {
			return;
		}
		
		if (this.oscillator !== null) {
			this.oscillator.stop();
		}
		
		this.release = release;
		
		this.isStarted = true;
		
		this.oscillator = this.context.createOscillator();
		this.oscillator.type = "sawtooth";
		this.oscillator.frequency.setValueAtTime(this.frequency, this.context.currentTime);
		
		this.gain = this.context.createGain();
		this.gain.gain.setValueAtTime(0, this.context.currentTime);
		this.gain.gain.linearRampToValueAtTime(1, this.context.currentTime + attack);
		this.gain.gain.linearRampToValueAtTime(sustain, this.context.currentTime + attack + decay);
		
		this.gain.connect(this.destination);
		this.oscillator.connect(this.gain);
		this.oscillator.start();
	}
	
	stop() {
		this.isStarted = false;
		
		if (this.gain === null) {
			return;
		}
		
		const value = this.gain.gain.value;
		this.gain.gain.cancelScheduledValues(this.context.currentTime);
		this.gain.gain.setValueAtTime(value, this.context.currentTime);
		this.gain.gain.linearRampToValueAtTime(0, this.context.currentTime + this.release);
	}
}

export default class Synthesizer {
	init() {
		if (this.isInit)
			return;
		
		this.context = new AudioContext();
		
		const gain = this.context.createGain();
		gain.gain.value = VOLUME;
		gain.connect(this.context.destination);
		
		this.analyzer = this.context.createAnalyser();
		this.analyzer.fftSize = 512;
		this.analyzer.connect(gain);
		this.frequencyDataArray = new Uint8Array(this.analyzer.frequencyBinCount);
		
		if (!this.frequencyCallback) {
			this.frequencyCallback = () => {};
		}
		
		setInterval(() => this.drawFrequency(), 100);
		
		this.eqNodes = [];
		let previousNode = this.analyzer;
		
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
		
		const destination = previousNode;
		this.notes = [];
		
		for (let i = 0; i < NOTE_FREQUENCIES.length; i++) {
			this.notes[i] = new Note(this.context, destination, NOTE_FREQUENCIES[i]);
		}
		
		this.attack = 0;
		this.decay = 0;
		this.sustain = 0;
		this.release = 0;
		
		this.isInit = true;
	}
	
	drawFrequency() {
		this.analyzer.getByteFrequencyData(this.frequencyDataArray);
		this.frequencyCallback(this.frequencyDataArray);
	}
	
	setFrequencyCallback(callback) {
		this.frequencyCallback = callback;
		console.log(this.frequencyCallback);
	}
	
	startNote(index) {
		this.init();
		
		this.notes[index].play(this.attack, this.decay, this.sustain, this.release);
	}
	
	stopNote(index) {
		this.init();
		
		this.notes[index].stop();
	}
	
	setEqualizer(index, value) {
		this.init();
		
		const node = this.eqNodes[index];
		
		node.gain.setValueAtTime(value * 50 - 25, this.context.currentTime);
	}
	
	setAttack(value) {
		console.log("Attack: " + value);
		
		this.attack = value / 100;
	}
	
	setDecay(value) {
		console.log("Decay: " + value);
		
		this.decay = value / 100;
	}
	
	setSustain(value) {
		console.log("Sustain: " + value);
		
		this.sustain = value / 100;
	}
	
	setRelease(value) {
		console.log("Release: " + value);
		
		this.release = value / 100;
	}
}