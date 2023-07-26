import { useRef } from "react";
import { useState } from "react";

const UploadingVideo = () => {
    const [file, setFile] = useState(null);
    const inputRef = useRef();
    const isVideo =["video/ogm", "video/wmv", "video/mpg", "video/webm", "video/ogv", "video/mov", "video/asx", "video/mpeg", "video/mp4", "video/m4v", "video/avi"];

    const dragOverManager = (event) => {
        event.preventDefault();
    };

    const dropManager = (event) => {
        event.preventDefault();
        selectFile(event.dataTransfer.files[0]);
    };

    const playVideo = () => {
        const player = document.getElementById("video-source");
        player.play();
    };

    const selectFile = (videoFile) => {
        if (!isVideo.includes(videoFile.type))
            alert("Upload a video");
        else
            setFile(URL.createObjectURL(videoFile));
    };
    
    if (file)
        return (
        <div className="uploads">
            <div>
                <select id="video-filter" defaultValue={"none"}>
                    <option id="none">none</option>
                    <option id="invert">invert</option>
                    <option id="lightshow">lightshow</option>
                </select>
                <button id="video-play" onClick={() => playVideo()}>Play</button>
            </div>
            <canvas id="video-canvas" width={750} height={500}></canvas>
            <video id="video-source" src={file} width={750} height={500} loop muted >
            </video>
        </div>
    )

    return (
        <>
            <div className="dropzone" onDragOver={dragOverManager} onDrop={dropManager}>
                    <h2 style={{color:"black"}}>Drag and Drop Video to Upload</h2>

                    <input 
                        type="file" 
                        onChange={(event) => selectFile(event.target.files[0])} 
                        hidden 
                        ref={inputRef}
                        accept="video/*">
                    </input>
                    <button onClick={() => inputRef.current.click()}>Select Video</button>
                </div>
        </>
    )
};

export default UploadingVideo;