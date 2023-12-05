/*eslint-disable*/
import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  padding: 1rem;
  max-width: 100%;
  justify-content: center;

  @media (min-width: 1500px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const VideoWrapper = styled.div`
  overflow: hidden;
  position: relative;
  padding-top: 56.25%; // 16:9 Aspect Ratio
  height: 0;
`;

const StyledYouTube = styled(YouTube)`
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    
  }
  
`;

function HomeYoutubeUI() {
  const videoIds = ['Y1FbowQRcmI', 'dcMxj_IiwXo', '3ArYMq5AomI', 'eVTXPUF4Oz4', 'MNyNRraMU8Y', 'pu93tLF8X0s', 'UqAjCtbJAVk', 'rboiHxBqdZk', '5bGMA2c93TY', 'azvujWI0mpM'];
  //백엔드랑 연동해서 데이터받아오기
  
  const playersRef = useRef({});
  const timeoutsRef = useRef({});

  const onReady = (event, id) => {
    playersRef.current[id] = event.target;
  };

  const onMouseEnter = (id) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
    }
    timeoutsRef.current[id] = setTimeout(() => {
      playersRef.current[id]?.playVideo();
    }, 300); // Delay playing video for 1 second after mouse enter
  };

  const onMouseLeave = (id) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      timeoutsRef.current[id] = null;
    }
    playersRef.current[id]?.stopVideo(); // Pause the video instead of stopping
  };

  const opts = {
    playerVars: {
      autoplay: 0, // Disable autoplay to prevent the video from playing on load
      modestbranding: 1, // Hide the Youtube logo as much as possible
      controls: 0, // Hide all video controls
      disablekb: 1, // Disable keyboard controls
      fs: 0, // Hide the full screen button
      iv_load_policy: 3, // Hide video annotations by default
      showinfo: 0, // Hide video title and uploader before video starts playing
      rel: 0, // Do not show related videos when playback ends
      origin: 'https://localhost:3000'
    },
  };

  return (
    <GridContainer>
      {videoIds.map((id) => (
        <VideoWrapper
          key={id}
          onMouseEnter={() => onMouseEnter(id)}
          onMouseLeave={() => onMouseLeave(id)}
        >
          <StyledYouTube
            videoId={id}
            opts={opts}
            onReady={(event) => onReady(event, id)}
          />
        </VideoWrapper>
      ))}
     
    </GridContainer>
  );
}

export default HomeYoutubeUI;