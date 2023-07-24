import React from 'react';
import Slider from 'react-slider';
import './Equalizer.css';

const EqualizerSlider = ({ synthesizer, frequency, index }) => {
  const afterChange = (value) => {
    synthesizer.setEqualizer(index, (100 - value) / 100);
  };
  
  return (
    <div className="eq-slider">
      <Slider 
        orientation="vertical"
        min={0}
        max={100}
        defaultValue={50}
        renderTrack={({ key }) => <div key={key} className="track" />}
        renderThumb={({ key, ...props }) => <div key={key} {...props} className="thumb" />}
        onAfterChange={afterChange}
      />
      <label>{frequency}</label>
    </div>
  );
}

const Equalizer = ({synthesizer}) => {
  const frequencies = ['30HZ', '60HZ', '120HZ', '250HZ', '500HZ', '1K', '2K', '4K', '8K', '16K'];
  
  return (
    <div id="equalizer">
      {frequencies.map((frequency, index) => <EqualizerSlider key={frequency} frequency={frequency} index={index} synthesizer={synthesizer} />)}
    </div>
  );
}

export default Equalizer;
