/*eslint-disable*/
import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import NavBarIcon from '../../utilites/NavBarIcon';

const ShortsContainer = styled.div`
  margin-top: 10px;
  padding-top: 20px;
  position: relative;
`

const ShortsLogo = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
`

const GridContainer = styled.div`
  margin-top: 10px;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  padding: 1rem;
  max-width: 100%;
  justify-content: center;
`;

const VideoWrapper = styled.div`
  overflow: hidden;
  position: relative;
  aspect-ratio: 9 / 16;
  width: 100%;
  background-color: #000; // 로딩 중이거나 이미지가 없을 때의 배경색
  border-radius: 8px; // 영상의 모서리를 둥글게 처리
  margin-bottom: 1rem; // 영상 간의 간격 조정

  // 화면 크기에 따른 유연한 크기 조정을 위한 미디어 쿼리
  @media (max-width: 299px) {
    min-width: 100px; // 매우 작은 화면에서의 최소 가로 크기 조정
  }
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

function HomeShortsUI() {
  
  //이거도 백엔드에서 데이터 받아와야함.
  const shortsData = ['8PbpEoCfWE0', 'JyBleAGqPKA', '0SHxoFCrv-0', 'zcWKMVwP22Q', 'QhzvzeI1HXo', 'yEHZ5QORy8M', 'XJArO6YxmSs'];

  const playersRef = useRef({});
  const timeoutsRef = useRef({});

  const onReady = (event, id) => {
    playersRef.current[id] = event.target;
    event.target.mute();
  }

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
    <ShortsContainer>
      <ShortsLogo>
        <NavBarIcon
          src = "../../../images/shorts.svg"
          alt = "shortslogo"
        />Shorts
      </ShortsLogo>
      
      <GridContainer>
        {shortsData.map((id) => (
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
    </ShortsContainer>
    
  );
}

export default HomeShortsUI;
