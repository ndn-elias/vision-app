/**
 * Class to handle webcam
 */
export class Webcam {
    /**
   * Open webcam and stream it through video tag.
   * @param {HTMLVideoElement} videoRef video tag reference
   */
    open = (videoRef, callback) => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: {
                        facingMode: 'environment'
                    }
                })
                .then((stream) => {
                    videoRef.srcObject = stream;
                    if(typeof callback === 'function')
                        return callback(stream);
                    return stream;
                })
                .catch(e => {
                    if(typeof callback === 'function')
                        return callback(null, e);
                    console.error('Webcam', e);
                });
        } else alert('Can\'t open Webcam!');
    };

    /**
   * Close opened webcam.
   * @param {HTMLVideoElement} videoRef video tag reference
   */
    close = (videoRef) => {
        if (videoRef.srcObject) {
            videoRef.srcObject.getTracks().forEach((track) => {
                track.stop();
            });
            videoRef.srcObject = null;
        } else alert('Please open Webcam first!');
    };
}
