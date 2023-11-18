import React from "react";
import SummaryList from "../../../common/summaryList";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import useSummaryService from "../../../api/useSummaryService";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const YouTubeRecent = () => {
  const summaryService = useSummaryService();
  const { isFetching, data } = useQuery({
    queryKey: ["youtubeRecent"],
    queryFn: summaryService.youtubeRecent,
  });

  return (
    <MainWrapper>
      {isFetching ? <p>로딩중...</p> : <SummaryList summaryList={data} />}
    </MainWrapper>
  );
};

export default YouTubeRecent;
