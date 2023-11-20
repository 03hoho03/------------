import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SummarizeResult from "../../components/SummarizeResult";
import Youtube from "../../common/Youtube";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RecentPostPage = () => {
  const { state } = useLocation();
  return (
    <MainWrapper>
      <SummarizeResult summaryData={state}>
        <Youtube videoId={state.video_id} />
      </SummarizeResult>
    </MainWrapper>
  );
};

export default RecentPostPage;
