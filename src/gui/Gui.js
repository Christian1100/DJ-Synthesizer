import './style.css';
import './Turntables.js';
import Turntables from "./Turntables.js";
import Equalizer from "./Equalizer/Equalizer";
import UploadingVideo from "../video/UploadingVideo";

function App({synthesizer})  {



    return (


        <div id="big-box-1">


            <div id="box-of-sound-waves-1">
                <div className="horizontal-line-1"></div>
                <p1></p1>
            </div>


            <div id="dj-box-1-n">

                <div id="tu-attack">

                    <Turntables turntableId="turntable-attack" knobId="knob-attack" lineId="line-attack" width='50px' height='50px'/>

                    <div id="word-attack">
                        <p> Decay</p>
                    </div>
                </div>

                <div id="tu-release">

                    <Turntables turntableId="turntable-release" knobId="knob-release" lineId="line-release" width='50px' height='50px'/>

                    <div id="word-release">
                        <p> Attack</p>
                    </div>
                </div>

                <div id="tu-sustain">

                    <Turntables turntableId="turntable-sustain" knobId="knob-sustain" lineId="line-sustain" width='50px' height='50px'/>

                    <div id="word-sustain">
                        <p> Release</p>
                    </div>
                </div>

                <div id="tu-decay">

                    <Turntables turntableId="turntable-decay" knobId="knob-decay" lineId="line-decay" width='50px' height='50px'/>

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


                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>

                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>

                    <div className="white-key"></div>

                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>

                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>
                    <div className="black-key"></div>
                    <div className="white-key"></div>

                </div>
            </div>


            <div id="video-box">
                <UploadingVideo />
                <div id="video-player">


                </div>

            </div>

        </div>


);
        }

export default App;
