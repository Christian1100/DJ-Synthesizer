import { useRef } from "react";
import { useState } from "react";

const UploadingVideo = () => {
    const [files, setFiles] = useState(null);
    const inputRef = useRef();

    const dragOverManager = (event) => {
        event.preventDefault();
    };

    const dropManager = (event) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    };

    if (files) return (
        <div className="uploads">
            <ul>
                {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
            </ul>
        </div>
    )

    return (
        <>
            <div className="dropzone" onDragOver={dragOverManager} onDrop={dropManager}>
                    <h2>Drag and Drop Video to Upload</h2>

                    <input 
                        type="file" 
                        onChange={(event) => setFiles(event.target.files)} 
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