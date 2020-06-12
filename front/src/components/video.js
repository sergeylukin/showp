import React from "react"
const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className="video">
    <video controls {...props}>
      <source src={videoSrcURL} type="video/mp4" />
    </video>
  </div>
)
export default Video
