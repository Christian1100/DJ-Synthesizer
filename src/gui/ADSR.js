// Importing React and PropTypes
const React = require('react');
const PropTypes = require('prop-types');

// Defining styles for the different SVG elements
const styles = {
  line: {
    fill: "none",
    stroke: 'rgb(220, 220, 230)',
    strokeWidth: "2",
  },
  timeline: {
    fill: "none",
    stroke: "#354550",
    strokeWidth: "1",
  },
  phaseLine: {
    fill: "none",
    stroke: 'rgb(220, 220, 230)',
    strokeWidth: "1",
    strokeDasharray: '5,5',
  },
  background: {
    fill: "rgb(40, 50, 60)",
  },
}

// Dimensions of the Scalable Vector Graphics (SVG)
const SvgDimension = { height: 500, width: 250 };

// The main component for rendering the ADSR envelope
const ADSR = (props) => {
    // Destructuring props
    const { attack, decay, sustain, release, style, lineStyle, timelineStyle, phaseLineStyle } = props;
    
    // Destructuring SVG dimensions
    const { height, width } = SvgDimension;

    // Compute the lengths of each phase based on the total time and dimensions of SVG
    const computePhaseLengths = () => {
        const totalTime = attack + decay + release;
        const relativeAttack = attack / totalTime;
        const relativeDecay = decay / totalTime;
        const relativeRelease = release / totalTime;
        const sustainWidth = 10;
        const remainingWidth = width - sustainWidth;

        return [relativeAttack * remainingWidth, relativeDecay * remainingWidth, sustainWidth, relativeRelease * remainingWidth];
    };

    // Destructuring phase lengths for each ADSR phase
    const [attackWidth, decayWidth, sustainWidth, releaseWidth] = computePhaseLengths();

    // Destructuring styles
    const { line, timeline, phaseLine, background } = styles;

    // Builds the path for the ADSR envelope
    const buildPath = () => {
        let pathElements = [];
        pathElements.push(`M 0 ${height}`); // Starts from the bottom-left corner
        pathElements.push(`l ${attackWidth} ${-height}`); // Line for the Attack phase
        pathElements.push(`c ${decayWidth/5} ${height*(1-sustain)/2} ${decayWidth/2} ${height*(1-sustain)} ${decayWidth} ${height*(1-sustain)}`); // Curve for the Decay phase
        pathElements.push(`l ${sustainWidth} 0`); // Line for the Sustain phase
        pathElements.push(`c ${releaseWidth/5} ${height*sustain/2} ${releaseWidth/2} ${height*sustain} ${releaseWidth} ${height*sustain}`); // Curve for the Release phase
        return pathElements.join(" ");
    };

    // Generates timelines based on the total time and SVG dimensions
    const generateTimelines = () => {
        const totalTime = attack + decay + release;
        let timelineElements = [];
        for (let i = 1e-6; i < 100; i *= Math.E) {
            if(i > totalTime) break;
            if(i/totalTime > 1e-2){
                timelineElements.push(<line key={i} x1={i/totalTime*width} y1="0" x2={i/totalTime*width} y2={height} style={{ ...timeline, ...timelineStyle }} vectorEffect="non-scaling-stroke" />);
            }
        }
        return timelineElements;
    };

    // Generates phase lines for each ADSR phase based on phase lengths
    const generatePhaseLines = () => {
        let phaseLines = [];
        let position = 0;
        for (let i = 0; i < computePhaseLengths().length-1 ; i++) {
            position += computePhaseLengths()[i];
            phaseLines.push(<line key={i} x1={position} y1="0" x2={position} y2={height} style={{ ...phaseLine, ...phaseLineStyle }} vectorEffect="non-scaling-stroke" />);
        }
        return phaseLines;
    };

    // The final SVG containing all the elements
    return (
        <svg style={style} viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect width={width} height={height} style={background} />
            {generateTimelines()}
            <path d={buildPath()} style={{ ...line, ...lineStyle }} vectorEffect="non-scaling-stroke" />
            {generatePhaseLines()}
        </svg>
    );
};

// PropTypes for the component
ADSR.propTypes = {
    attack: PropTypes.number.isRequired,
    decay: PropTypes.number.isRequired,
    sustain: PropTypes.number.isRequired,
    release: PropTypes.number.isRequired,

    style: PropTypes.object,
    lineStyle: PropTypes.object,
    timelineStyle: PropTypes.object,
    phaseLineStyle: PropTypes.object,
};

export default ADSR;
