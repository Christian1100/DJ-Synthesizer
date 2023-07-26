import './style.css';
import './Turntables.js';
import Turntables from "./Turntables.js";
import Equalizer from "./Equalizer/Equalizer";
import UploadingVideo from "../video/UploadingVideo";
import ADSR from './ADSR';
import {useEffect, useState} from 'react';
import VideoFilter from '../video/VideoFilter';

function App({synthesizer})  {
    const [attack, setAttack] = useState(0);
    const [decay, setDecay] = useState(0);
    const [sustain, setSustain] = useState(0);
    const [release, setRelease] = useState(0);
    
    useEffect(() => synthesizer.setAttack(attack), [synthesizer, attack]);
    useEffect(() => synthesizer.setDecay(decay), [synthesizer, decay]);
    useEffect(() => synthesizer.setSustain(sustain), [synthesizer, sustain]);
    useEffect(() => synthesizer.setRelease(release), [synthesizer, release]);
    
    const pianoKeyColors = [
        "white-key", "black-key", "white-key", "black-key", "white-key",
        "white-key", "black-key", "white-key", "black-key", "white-key", "black-key", "white-key",
        "white-key", "black-key", "white-key", "black-key", "white-key",
        "white-key", "black-key", "white-key", "black-key", "white-key", "black-key", "white-key",
        "white-key", "black-key", "white-key", "black-key", "white-key",
        "white-key", "black-key", "white-key", "black-key", "white-key", "black-key", "white-key",
        "white-key"
    ]
    
    return (


        <div id="big-box-1">
            <ADSR attack={attack} decay={decay} sustain={sustain} release={release} />


            <div id="box-of-sound-waves-1">
                <div className="horizontal-line-1"></div>
                <p1></p1>
            </div>


            <div id="dj-box-1-n">

                <div id="tu-attack">

                    <Turntables turntableId="turntable-attack" knobId="knob-attack" lineId="line-attack" width='50px' height='50px' onChange={value => setDecay(value)}/>

                    <div id="word-attack">
                        <p> Decay</p>
                    </div>
                </div>

                <div id="tu-release">

                    <Turntables turntableId="turntable-release" knobId="knob-release" lineId="line-release" width='50px' height='50px' onChange={value => setAttack(value)}/>

                    <div id="word-release">
                        <p> Attack</p>
                    </div>
                </div>

                <div id="tu-sustain">

                    <Turntables turntableId="turntable-sustain" knobId="knob-sustain" lineId="line-sustain" width='50px' height='50px' onChange={value => setRelease(value)}/>

                    <div id="word-sustain">
                        <p> Release</p>
                    </div>
                </div>

                <div id="tu-decay">

                    <Turntables turntableId="turntable-decay" knobId="knob-decay" lineId="line-decay" width='50px' height='50px' onChange={value => setSustain(value)}/>

                    <div id="word-decay">
                        <p> Sustain</p>
                    </div>
                </div>


            </div>

            <div id="box-of-sound-waves-2">

                <Equalizer synthesizer={synthesizer}/>

                <div className="horizontal-line-2"></div>
                <p1></p1>
            </div>

            <div id="dj-box-2">


                <div id="tu-plus-min-low">

                    <Turntables turntableId="turntable-plus-min-low" knobId="knob-plus-min-low" lineId="line-plus-min-low" width='100px' height='100px'/>

                    <div id="t1-text-mp-low">
                        <p> + low - </p>
                    </div>
                </div>


                <div id="tu-plus-min-middle">
                    <Turntables turntableId="turntable-plus-min-middle" knobId="knob-plus-min-middle" lineId="line-plus-min-middle" width='100px' height='100px'/>
                    <div id="t1-text-mp-middle">
                        <p> + middle - </p>
                    </div>
                </div>

                <div id="tu-plus-min-high">
                    <Turntables turntableId="turntable-plus-min-high" knobId="knob-plus-min-high" lineId="line-plus-min-high" width='100px' height='100px'/>
                    <div id="t1-text-mp-high">
                        <p> + high - </p>
                    </div>
                </div>
                <div id="tu-high">
                    <Turntables turntableId="turntable-high" knobId="knob-high" lineId="line-high" width='100px' height='100px'/>
                    <div id="t1-text-high">
                        <p> High </p>
                    </div>
                </div>

                <div id="tu-low-1">
                    <Turntables turntableId="turntable-low-1" knobId="knob-low-1" lineId="line-low-1" width='100px' height='100px'/>
                    <div id="t1-text-low-1">
                        <p> Low </p>
                    </div>
                </div>

                <div id="sliders-box">
                    <div id="sliders">
                        <input type="range" id="slider1" min="0" max="100"/>
                    </div>

                </div>

            </div>




            <div id="piano-box">
                <div id="piano-keys">
                    {pianoKeyColors.map((color, i) => 
                        <div className={color} onMouseDown={() => synthesizer.startNote(i)} onMouseUp={() => synthesizer.stopNote(i)} onMouseLeave={() => synthesizer.stopNote(i)}></div>
                    )}
                </div>
            </div>


            <div id="video-box">
                <UploadingVideo />
                <VideoFilter synthesizer={synthesizer} />

            </div>

        </div>


);
        }

export default App;