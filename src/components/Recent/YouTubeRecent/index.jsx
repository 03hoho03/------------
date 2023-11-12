import React from "react";
import RecentList from "../RecentList";
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
      {isFetching ? <p>로딩중...</p> : <RecentList recentList={data} />}
    </MainWrapper>
  );
};

export default YouTubeRecent;
