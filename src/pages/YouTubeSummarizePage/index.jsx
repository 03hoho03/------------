import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../_state/user";
import SummarizeResult from "../../components/SummarizeResult";
import YouTube from "react-youtube";
import SummarizeInputForm from "../../components/SummarizeInputForm";
import useSummaryService from "../../api/useSummaryService";
import { useQuery } from "@tanstack/react-query";
import RecentLink from "../../components/RecentLink";
import FormHeader from "../../components/FormHeader";
import { FadeLoader } from "react-spinners";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  width: 100%;
  padding: 0 24px;
`;
const YouTubeWrapper = styled.div`
  margin-top: 12px;
`;
const ResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 400px;
`;

const type = "youtube";
const formHeaderInfo = {
  title: "유튜브 요약",
  description: "긴 유튜브 영상을 중요한 키워드만 요약해보세요",
};

const YouTubeSummarizePage = () => {
  const { title, description } = formHeaderInfo;
  const summaryService = useSummaryService();
  const [inputValue, setInputValue] = useState("");
  const [videoId, setVideoId] = useState(null);
  const { user } = useRecoilValue(userAtom);
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["summarize"],
    queryFn: () => summaryService.youtubeSummarize(user, inputValue),
    enabled: false,
    retry: false,
  });

  return (
    <MainWrapper>
      <FormHeader title={title} description={description} />
      <SummarizeInputForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        setVideoId={setVideoId}
        isFetching={isFetching}
        refetch={refetch}
      />
      <RecentLink filter={type} />
      {videoId && (
        <YouTubeWrapper>
          <YouTube
            videoId={videoId}
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
      )}
      <ResultWrapper>
        {isFetching ? (
          <FadeLoader />
        ) : (
          data && <SummarizeResult summaryData={data} />
        )}
      </ResultWrapper>
    </MainWrapper>
  );
};

export default YouTubeSummarizePage;
