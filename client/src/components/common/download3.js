import React, { useState } from "react";
import ytdl from "ytdl-core";
import fs from "fs";
function DownloadVideo() {
  const [progress, setProgress] = useState(0);

  function handleDownload() {
    const videoUrl = "https://www.youtube.com/watch?v=VIDEO_ID";
    const videoFormat = "mp4";

    const videoInfo = ytdl.getInfo(videoUrl).then((info) => {
      const videoTitle = info.videoDetails.title;
      const videoStream = ytdl(videoUrl, { quality: "highest" }).on(
        "progress",
        (chunkLength, downloaded, total) => {
          const percent = Math.round((downloaded / total) * 100);
          setProgress(percent);
        }
      );
      videoStream
        .pipe(fs.createWriteStream(`${videoTitle}.${videoFormat}`))
        .on("finish", () => {
          console.log("Video downloaded successfully");
        });
    });
  }

  return (
    <div>
      <button onClick={handleDownload}>Download Video</button>
      <p>Download Progress: {progress}%</p>
    </div>
  );
}
