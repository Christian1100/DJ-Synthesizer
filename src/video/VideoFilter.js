import VideoManipulator from "./VideoManipulator.js";

const VideoFilter = () => {
    render();

    function render() {
        const video = document.getElementById("video-source");
        if (video != null) {
        video.style.display = "none";
        let canvas = document.getElementById("video-canvas");
        let manipulator = new VideoManipulator(video, canvas, null, true);
        setfilter(manipulator);
        manipulator.render();
        }
        requestAnimationFrame(render);
    }

    function setfilter(manipulator) {
        const filterSelect = document.getElementById("video-filter");
        const filter = filterSelect[filterSelect.selectedIndex].id;
        switch(filter) {
            case "none":
                manipulator.applyFilter = false;
                break;

            case "invert":
                manipulator.setFilter(invertFilter);
                break;

            case "lightshow":
                manipulator.setFilter(lightshow);
                break;

            default: break;
        }
    }

    function invertFilter(frame, width, height) {
        const data = frame.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i + 0] = (i === 3 ? 1 : 255) - data[i + 0];
            data[i + 1] = (i === 3 ? 1 : 255) - data[i + 1];
            data[i + 2] = (i === 3 ? 1 : 255) - data[i + 2];
        }
    }

let circleData = [];
let lastTimestamp = 0;
function lightshow(frame, width, height) {
    if (circleData.length === 0) {
        initCircleData();
    }

    const currentTime = performance.now();
    
    circleData.forEach(circle => {
        if (circle.nextTimestamp < currentTime) {
            circle.offsetX = getRandomNumber(-100 - circle.centerX, 100 - circle.centerX);
            circle.offsetY = getRandomNumber(-100 - circle.centerY, 100 - circle.centerY);
            circle.timestamp = currentTime;
            circle.nextTimestamp = currentTime + getRandomNumber(500, 3000);
        }
        const deltaTime = (currentTime - lastTimestamp) / (circle.nextTimestamp - circle.timestamp);

        circle.centerX += circle.offsetX * deltaTime;
        circle.centerY += circle.offsetY * deltaTime;
        generateCircle(frame.data, width, height, circle);
    });
    lastTimestamp = currentTime;
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

function initCircleData() {
    circleData.push({
        centerX: 0,
        centerY: 0,
        offsetX: 0,
        offsetY: 0,
        color: {r: 255, g: 0, b: 0},
        radius: 130,
        opacity: 0.4,
        timestamp: 0,
        nextTimestamp: 0,
    });
    circleData.push({
        centerX: 0,
        centerY: 0,
        offsetX: 0,
        offsetY: 0,
        color: {r: 0, g: 255, b: 0},
        radius: 130,
        opacity: 0.6,
        timestamp: 0,
        nextTimestamp: 0,
    });
    circleData.push({
        centerX: 0,
        centerY: 0,
        offsetX: 0,
        offsetY: 0,
        color: {r: 0, g: 0, b: 255},
        radius: 130,
        opacity: 0.4,
        timestamp: 0,
        nextTimestamp: 0,
    });
}

function generateCircle(data, width, height, circle) {
    const innerCircleRadius = circle.radius * 0.6;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;

            const distanceToCenter = Math.sqrt((x - width / 2 + circle.centerX) ** 2 + (y - height / 2 + circle.centerY) ** 2);

            if (distanceToCenter <= circle.radius) {
                let strength;
                if (distanceToCenter < innerCircleRadius) {
                    strength = circle.opacity;
                } else {
                    strength = (circle.radius - distanceToCenter) / (circle.radius - innerCircleRadius) * circle.opacity;
                }

                data[offset + 0] += (circle.color.r - data[offset + 0]) * strength;
                data[offset + 1] += (circle.color.g - data[offset + 1]) * strength;
                data[offset + 2] += (circle.color.b - data[offset + 2]) * strength;
            }
        }
    }
}
}

export default VideoFilter;