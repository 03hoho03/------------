import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";

const MainWrapper = styled.section`
  width: 100%;
  padding: 24px 12px;
`;
const YouTubeWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 12px;
  max-height: 720px;
  margin-bottom: 12px;
`;
const ContentWrapper = styled.div``;
const IntroduceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const VideoTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;
const ChannelName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const DescriptionWrapper = styled.div`
  padding: 0 12px;
`;
const Description = styled.p``;
const RecentPostPage = () => {
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
  }, []);
  return (
    <MainWrapper>
      <YouTubeWrapper>
        <YouTube
          videoId={state.video_id}
          opts={{
            width: "480px",
            height: "360px",
            playerVars: {
              autoplay: 0, //자동 재생 여부
              loop: 1, //반복 재생
            },
          }}
          onReady={(e) => {
            e.target.pauseVideo(); //소리 끔
          }}
        />
      </YouTubeWrapper>
      <ContentWrapper>
        <IntroduceWrapper>
          <VideoTitle>{state.title}</VideoTitle>
          <ChannelName>{`${state.channel_name}`}</ChannelName>
        </IntroduceWrapper>
        <DescriptionWrapper>
          <Description>{state.summary}</Description>
        </DescriptionWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default RecentPostPage;
