import { useState, useEffect } from 'react';
import { Webcam } from './utils/webcam';

// source: https://www.pexels.com/search/videos/crowd/
const VIDEO_SRC = '/assets/video_people_001.mp4';

const ButtonHandler = ({ cameraRef, videoRef }) => {
    const [, setStreaming] = useState(null); // streaming state
    const webcam = new Webcam(); // webcam handler

    const loadVideo = () => {
        if(!videoRef?.current) return;
        videoRef.current.src = VIDEO_SRC; // set video source
        videoRef.current.style.display = 'block'; // show video
        setStreaming('video'); // set streaming to video
    };

    const loadWebcam = () => {
        webcam.open(cameraRef.current, (stream, err) => {
            if(err) return loadVideo();
            cameraRef.current.style.display = 'block'; // show camera
            setStreaming('camera'); // set streaming to camera
        }); // open webcam
    };

    useEffect(() => loadWebcam());
    return;
};

export default ButtonHandler;
