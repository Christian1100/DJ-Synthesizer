import React from 'react';
import Slider from 'react-slider';
import './Equalizer.css';

const EqualizerSlider = ({ frequency }) => {
  return (
    <div className="eq-slider">
      <Slider 
        orientation="vertical"
        min={0}
        max={100}
        defaultValue={50}
        renderTrack={({ key }) => <div key={key} className="track" />}
        renderThumb={({ key, ...props }) => <div key={key} {...props} className="thumb" />}
      />
      <label>{frequency}</label>
    </div>
  );
}

const Equalizer = () => {
  const frequencies = ['30HZ', '60HZ', '120HZ', '250HZ', '500HZ', '1K', '2K', '4K', '8K', '16K'];

  return (
    <div id="equalizer">
      {frequencies.map(frequency => <EqualizerSlider key={frequency} frequency={frequency} />)}
    </div>
  );
}

export default Equalizer;
