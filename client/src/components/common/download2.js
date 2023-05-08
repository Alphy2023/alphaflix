import React from 'react';
import ytdl from 'ytdl-core';

function DownloadVideo() {
  const downloadVideo = async () => {
    const videoUrl = 'https://www.youtube.com/watch?v=VIDEO_ID_HERE';
    const videoInfo = await ytdl.getInfo(videoUrl);
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });
    const videoName = videoInfo.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_') + '.' + videoFormat.container;

    const downloadLink = document.createElement('a');
    downloadLink.href = videoFormat.url;
    downloadLink.download = videoName;
    downloadLink.click();
  };

  return (
    <div>
      <button onClick={downloadVideo}>Download Video</button>
    </div>
  );
}

export default DownloadVideo;
