import React from "react";
import styled from "styled-components";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const VideoTitle = styled.h3`
  font-size: 32px;
  font-weight: bold;
  color: black;
`;
const ChannelName = styled.h5`
  font-size: 20px;
  color: black;
`;
const SummaryContent = styled.p`
  font-size: 16px;
  color: black;
`;
const SummarizeResult = ({ summaryData }) => {
  console.log(summaryData);
  const { channel_name, summary, title, video_id } = summaryData;
  return (
    <MainWrapper>
      <VideoTitle>{title}</VideoTitle>
      <ChannelName>{channel_name}</ChannelName>
      <SummaryContent>{summary}</SummaryContent>
    </MainWrapper>
  );
};

export default SummarizeResult;
