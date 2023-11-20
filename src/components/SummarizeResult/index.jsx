import React from "react";
import styled from "styled-components";

const MainWrapper = styled.section`
  width: 100%;
  max-width: 800px;
  padding: 12px;
  margin: 0 auto;
  @media (max-width: 480px) {
    width: 100%;
    padding: 6px;
  }
`;
const ContentWrapper = styled.div`
  margin-top: 12px;
`;
const IntroduceWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;
const SummarizeResult = ({ children, summaryData }) => {
  const { channel_name, summary, title } = summaryData;
  return (
    <MainWrapper>
      {children}
      <ContentWrapper>
        <IntroduceWrapper>
          <VideoTitle>{title}</VideoTitle>
          <ChannelName>{`${channel_name}`}</ChannelName>
        </IntroduceWrapper>
        <Description>{summary}</Description>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default SummarizeResult;
