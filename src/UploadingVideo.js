import { useState } from "react";

const UploadingVideo = () => {
    const [files, setFiles] = useState(null);

    return (
        <>
            {!files && (
                <div className="dropzone">
                    <h2>Drag and Drop Video to Upload</h2>
                    <button>Select Video</button>
                </div>
            )}
        </>
    )
};

export default UploadingVideo;