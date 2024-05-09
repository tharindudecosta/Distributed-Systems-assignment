import React, { useEffect, useRef } from "react";

export default function VideoPlayer(props) {
    const {width, height,videoUrl} = props
  const cloudinaryRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (cloudinaryRef.current) return;
    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: "dsj8tuguz",
    });
  }, []);
  return (
    <div>
      <video ref={videoRef} 
      data-cld-public-id={videoUrl} 
      // data-cld-public-id="https://res.cloudinary.com/dsj8tuguz/video/upload/v1715074361/eqfa0nrbpmy6lkwpxt7v.mp4" 
      width={width}
      height={height}
      controls/>
    </div>
  );
}

// import {v2 as cloudinary} from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'dsj8tuguz',
//   api_key: '825139752969162',
//   api_secret: 'Xd5Pz51xIHme98e_U8VWvW3yzwU'
// });
