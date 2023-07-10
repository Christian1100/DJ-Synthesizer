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
}

export default VideoFilter;