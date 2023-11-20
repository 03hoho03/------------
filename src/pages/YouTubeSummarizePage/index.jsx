import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../_state/user";
import SummarizeResult from "../../components/SummarizeResult";
import SummarizeInputForm from "../../components/SummarizeInputForm";
import useSummaryService from "../../api/useSummaryService";
import { useQuery } from "@tanstack/react-query";
import RecentLink from "../../components/RecentLink";
import FormHeader from "../../components/FormHeader";
import { FadeLoader } from "react-spinners";
import Youtube from "../../common/Youtube";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 24px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 120px 24px 24px;
`;
const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
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
  });

  return (
    <MainWrapper>
      <InputWrapper>
        <FormHeader title={title} description={description} />
        <SummarizeInputForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          setVideoId={setVideoId}
          isFetching={isFetching}
          refetch={refetch}
        />
        <RecentLink filter={type} />
      </InputWrapper>
      <ResultWrapper>
        {videoId && <Youtube videoId={videoId} />}
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
