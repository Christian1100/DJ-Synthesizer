import React, { useState, useRef } from 'react';

const TurntableComponent = ({ turntableId, knobId, lineId, width, height }) => {
    const [rotations, setRotations] = useState(0);
    const isMouseDown = useRef(false);
    const prevMouseX = useRef(0);

    const handleMouseDown = () => {
        isMouseDown.current = true;
    };

    const handleMouseUp = () => {
        isMouseDown.current = false;
    };

    const handleMouseMove = (event) => {
        if (isMouseDown.current) {
            const knobRect = document.querySelector(`#${knobId}`).getBoundingClientRect();
            const mouseX = event.clientX - knobRect.left;
            const mouseY = event.clientY - knobRect.top;
            const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

            // Ändere den Winkel basierend auf der horizontalen Bewegung
            setRotations((prevRotations) => prevRotations + angle - prevMouseX.current);
            prevMouseX.current = angle;
        }
    };

    return (
        <div>
            <div
                id={turntableId}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{
                    position: 'relative',
                    width: width,
                    height: height,
                    border: '1px solid black',
                    borderRadius: '50%',
                }}
            >
                <div
                    id={lineId}
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '40%',
                        width: '15px',
                        height: '50%',
                        backgroundColor: 'white',
                        transformOrigin: 'center bottom',
                        transform: `rotate(${rotations}deg)`,
                    }}
                ></div>
                <div
                    id={knobId}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '25px',
                        height: '25px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        cursor: 'grab',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default TurntableComponent;
