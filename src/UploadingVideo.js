import { useRef } from "react";
import { useState } from "react";

const UploadingVideo = () => {
    const [file, setFile] = useState(null);
    const inputRef = useRef();

    const dragOverManager = (event) => {
        event.preventDefault();
    };

    const dropManager = (event) => {
        event.preventDefault();
        setFile(URL.createObjectURL(event.dataTransfer.files[0]));
    };
    
    if (file)
        return (
        <div className="uploads">
            <video width="750" height="500" controls>
            <source src={file} type="video/mp4"/>
            </video>
        </div>
    )

    return (
        <>
            <div className="dropzone" onDragOver={dragOverManager} onDrop={dropManager}>
                    <h2>Drag and Drop Video to Upload</h2>

                    <input 
                        type="file" 
                        onChange={(event) => setFile(URL.createObjectURL(event.target.files[0]))} 
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