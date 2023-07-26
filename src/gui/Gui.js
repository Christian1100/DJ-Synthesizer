import './style.css';
import './Turntables.js';
import Turntables from "./Turntables.js";
import Equalizer from "./Equalizer/Equalizer";
import UploadingVideo from "../video/UploadingVideo";
import ADSR from './ADSR';
import {useEffect, useState} from 'react';
import VideoFilter from '../video/VideoFilter';
import Graph from "./Graph";

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



            <div id="box-of-sound-waves-1">
                <ADSR attack={attack} decay={decay} sustain={sustain/100} release={release} />
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

                <Graph synthesizer={synthesizer}/>


                <p1></p1>
            </div>
            <div id="box-of-sound-waves-2-e">

                <Equalizer synthesizer={synthesizer}/>

            </div>

            <div id="dj-box-2-n">




                <div id="tu-high">
                    <Turntables turntableId="turntable-high" knobId="knob-high" lineId="line-high" width='120px' height='120px' onChange={value => synthesizer.setDelayTime(value)}/>
                    <div id="t1-text-high">
                        <p>Delay Time</p>
                    </div>
                </div>

                <div id="tu-low-1">
                    <Turntables turntableId="turntable-low-1" knobId="knob-low-1" lineId="line-low-1" width='120px' height='120px' onChange={value => synthesizer.setDelayValue(value)}/>
                    <div id="t1-text-low-1">
                        <p>Delay Amount</p>
                    </div>
                </div>

                <div id="sliders-box">
                    <div id="sliders">
                        <input type="range" id="slider1" min="0" max="100" onChange={event => synthesizer.setVolume(100 - event.target.value)}/>
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