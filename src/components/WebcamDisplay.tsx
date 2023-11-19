import React, { useEffect, useRef } from 'react';

const WebcamDisplay = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            (videoRef.current as HTMLVideoElement).srcObject = stream;
          }
        })
        .catch((err) => {
          console.log("An error occurred: " + err);
        });
    } else {
      console.log("getUserMedia not supported");
    }
    const animate = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let pixels = imgData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        // Invert the colors
        pixels[i] = 255 - pixels[i];   // Red
        pixels[i + 1] = 255 - pixels[i + 1]; // Green
        pixels[i + 2] = 255 - pixels[i + 2]; // Blue
      }

      ctx.putImageData(imgData, 0, 0);

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <>
      <div>WebCam + Inversion Effect</div>
      <video id="webcam" ref={videoRef} width="640" height="480" autoPlay style={{ display: 'none' }} />
      <canvas id="canvas" ref={canvasRef} width="640" height="480" />
    </>
  );
};


    // return () => {
    //   // Cleanup logic
    //   if (videoRef.current && (videoRef.current as HTMLVideoElement).srcObject) {
    //     const srcObject = (videoRef.current as HTMLVideoElement).srcObject;
    //     if (srcObject instanceof MediaStream) {
    //       const tracks = srcObject.getTracks();
    //       tracks.forEach((track) => track.stop());
    //     }
    //   }
    // };
  // }, []);
//   return <video id="webcam" ref={videoRef} width="640" height="480" autoPlay />;
// };

export default WebcamDisplay;