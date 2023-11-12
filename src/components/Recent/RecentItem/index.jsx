import React, { useEffect } from "react";
import styled from "styled-components";
import { shortenWords } from "../../../utils/cutWords";
import { useNavigate } from "react-router-dom";

const MainWrapper = styled.section`
  border-bottom: 1px solid #b1b1b1;
  @media (min-width: 0) and (max-width: 480px) {
    padding: 0 12px;
    width: 100%;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    width: calc(50% - 10px);
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: calc(33.33% - 10px);
  }
  @media (min-width: 1024px) {
    width: calc(25% - 10px);
  }
  &:hover {
    cursor: pointer;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 12px 8px;
  border: none;
  border-radius: 20px;
`;
const VideoTitle = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  color: black;
  margin-bottom: 8px;
`;
const VideoChannelName = styled.div`
  font-size: 12px;
  color: black;
  margin-bottom: 8px;
`;
const ViewSummaryBtn = styled.button`
  width: 100%;
  background-color: #ffa600c4;
  border: none;
  border-radius: 16px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  padding: 4px 8px;
  &:hover {
    background-color: orange;
  }
`;
const RecentItem = ({ item }) => {
  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate(`/recent/youtube/${item.video_id}`, {
      replace: false,
      state: {
        ...item,
      },
    });
  };
  return (
    <MainWrapper onClick={onHandleClick}>
      <ContentWrapper>
        <img src={item.thumbnail} alt="thumbnail" />
        <VideoTitle>{item.title}</VideoTitle>
        <VideoChannelName>{item.channel_name}</VideoChannelName>
        {/* <VideoSummaryWrapper>
          <VideoSummary>{shortenWords(item.summary, wordsLimit)}</VideoSummary>
        </VideoSummaryWrapper> */}
        <ViewSummaryBtn>요약 보기</ViewSummaryBtn>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default RecentItem;
