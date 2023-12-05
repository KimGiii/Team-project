/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from "styled-components";
import getButtonData from './getButtonData';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const GenreButton = styled.button`
  background-color: #e2e2e2;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  height: 5vh;
  margin: 0 auto;
  font-size: 20px;
  font-weight: 600;
  &:hover{
    cursor: pointer;
    background-color: #e98a81; // 색감 수정
  }
`

const ShortsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 800px;
  margin: 20px auto 0 auto;
`

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 80vh;
  max-width: 500px;
  margin: auto;
  background-color: #000;
  border-radius: 8px;
`;

const StyledYoutube = styled(YouTube)`
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 4px;
  right: 20px;
`

const StyledButton = styled.img`
  background-color: #e2e2e2;
  margin: 10px;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  padding: 10px;
  &:hover{
    cursor: pointer;
    background-color: #5f5f5f;
  }
`

function ShortsShow(){
  const [videoId, setVideoId] = useState('6zcccp1p-Uc');
  const buttons = [...getButtonData]; 
  
  const updateVideoId = (newVideoId) => {
    setVideoId(newVideoId);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown'){
      updateVideoId('GYK__pd_ejA')
    }
  }

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      updateVideoId('GYK__pd_ejA')
    }
  }

  useEffect(()=> {
    // 마운트 될 때 이벤트 리스너 추가
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel);

    // 언마운트 될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleKeyDown, handleWheel])

  const opts = {
    playerVars: {
      autoplay: 1, // Disable autoplay to prevent the video from playing on load
      modestbranding: 1, // Hide the Youtube logo as much as possible
      controls: 0, // Hide all video controls
      fs: 0, // Hide the full screen button
      iv_load_policy: 3, // Hide video annotations by default
      showinfo: 0, // Hide video title and uploader before video starts playing
      rel: 0, // Do not show related videos when playback ends
    },
  };

  const onPlayerReady = (event) => {
    console.log("플레이어 준비");
  }

  return (
    <Container>
      <GenreButton>장르</GenreButton>
      <ShortsContainer>
        <VideoWrapper>
          <StyledYoutube 
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
          />
        </VideoWrapper>
        <ButtonContainer>
          {buttons.map((item) => (
            <StyledButton key={item.id}
              src={item.src}
              alt={item.alt}
            />
          ))}
        </ButtonContainer>
      </ShortsContainer>
    </Container>
    
  )
}

export default ShortsShow;