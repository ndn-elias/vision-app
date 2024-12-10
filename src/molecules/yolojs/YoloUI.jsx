import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl'; // set backend to webgl
import Loader from './Loader';
import ModelHandler from './ModelHandler';
import { detectVideo } from './utils/detect';
import './YoloUI.scss';

const MODEL_NAME = 'yolov8n';
const MODEL_URL = `/assets/${MODEL_NAME}_web_model/model.json`;

const App = () => {
    const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
    const [model, setModel] = useState({
        net: null,
        inputShape: [1, 0, 0, 3]
    }); // init model & input shape

    // references
    const cameraRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        tf.ready()
            .then(async () => {
                const yolov8 = await tf.loadGraphModel(
                    MODEL_URL,
                    {
                        onProgress: (fractions) => {
                            setLoading({ loading: true, progress: fractions }); // set loading fractions
                        }
                    }
                ); // load model

                // warming up model
                const dummyInput = tf.ones(yolov8.inputs[0].shape);
                const warmupResults = yolov8.execute(dummyInput);

                setLoading({ loading: false, progress: 1 });
                setModel({
                    net: yolov8,
                    inputShape: yolov8.inputs[0].shape
                }); // set model & input shape

                tf.dispose([warmupResults, dummyInput]); // cleanup memory
                return;
            })
            .catch(e => console.error('ModelHandler', e));
    }, []);

    return (
        <div className="YoloUI">
            {loading.loading && <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>}

            <div className="content">
                <video
                    muted
                    autoPlay
                    ref={cameraRef}
                    onPlay={() => detectVideo(cameraRef.current, model, canvasRef.current)}
                />
                <video
                    loop
                    muted
                    autoPlay
                    ref={videoRef}
                    onPlay={() => detectVideo(videoRef.current, model, canvasRef.current)}
                />
                <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
            </div>

            <ModelHandler cameraRef={cameraRef} videoRef={videoRef} />
        </div>
    );
};

export default App;