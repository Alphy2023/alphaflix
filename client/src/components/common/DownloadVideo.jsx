
import React, { useState } from "react";
import YoutubeDL from "youtube-dl";
import fs from "fs";
function DownloadVideo() {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleDownload = () => {
    const video = YoutubeDL(videoUrl, ["-f", "best"]);
    video.on("info", (info) => {
      console.log(`Download started: ${info._filename}`);
    });
    video.on("end", () => {
      console.log("Download completed");
      setDownloadUrl(video.info.url);
    });
    video.pipe(fs.createWriteStream(`${video.info._filename}`));
  };

  return (
    <div>
      <input type="text" value={videoUrl} onChange={handleInputChange} />
      <button onClick={handleDownload}>Download</button>
      {downloadUrl && (
        <a href={downloadUrl} download>
          Download Link
        </a>
      )}
    </div>
  );
}

export default DownloadVideo;
