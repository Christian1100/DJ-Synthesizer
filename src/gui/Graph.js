import React, {useEffect, useState} from 'react';

const Graph = ({ synthesizer }) => {
  const [xScale, setXScale] = useState(1);
  const [yScale, setYScale] = useState(1);
  const [points, setPoints] = useState([{x: 50, y: 50}, {x: 100, y: 150}, {x: 300, y: 100}]); //TODO: Array mit Punkten füllen

  useEffect(() => {synthesizer.setFrequencyCallback(data => {
      let i = 0;
      let points = [];
      
      for (const value of data) {
          points[i] = {x: i, y: value};
          i++;
      }
      
      setPoints(points);
  })}, [synthesizer, setPoints]);
  
  return (
    <div>
      <svg width={500} height={250}>
        <line x1={0} y1={0} x2={0} y2={250} stroke="black" strokeWidth="5" />
        <line x1={500} y1={0} x2={500} y2={250} stroke="black" strokeWidth="5" />

        {points.map((point, index) => (
          <React.Fragment key={index}>
            <circle
               key={index}
               cx={point.x * xScale}
               cy={250 - point.y * yScale}
               r="2"
               fill="black"
            />
            {index > 0 && (
              <line
                x1={points[index - 1].x * xScale}
                y1={250 - points[index - 1].y * yScale}
                x2={point.x * xScale}
                y2={250 - point.y * yScale}
                stroke="black"
              />
            )}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default Graph;