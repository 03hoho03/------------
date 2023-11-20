import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormHeader from "../../components/FormHeader";
import { useQuery } from "@tanstack/react-query";
import useSummaryService from "../../api/useSummaryService";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../_state/user";
import AudioSummarizeResult from "../../components/AudioSummarizeResult";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 0 24px;
  margin: 120px auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin-bottom: 24px;
`;
const InputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 280px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;
`;
const LabelBtn = styled.label`
  font-size: 14px;
  padding: 12px 24px;
  color: white;
  background-color: #ffa600d3;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: orange;
    cursor: pointer;
  }
`;
const FileInput = styled.input`
  width: 0;
  height: 0;
`;
const FileName = styled.p`
  min-height: 24px;
  text-align: center;
  margin-bottom: 8px;
  overflow: hidden;
`;
const SubmitBtn = styled.button`
  color: white;
  background-color: #ffa600cc;
  border: none;
  border-radius: 18px;
  padding: 8px 12px;
  &:hover {
    background-color: orange;
  }
`;

const formHeaderInfo = {
  title: "오디오 파일 요약",
  description: "긴 오디오 녹음 파일을 중요한 키워드만 요약해보세요",
};

const AudioSummarizePage = () => {
  const { title, description } = formHeaderInfo;
  const summaryService = useSummaryService();
  const navigate = useNavigate();
  const { isAuth } = useRecoilValue(userAtom);
  const [file, setFile] = useState(null);
  const whisper = useQuery({
    queryKey: ["whisper"],
    queryFn: () => summaryService.getTextFromWhisper(file),
    enabled: false,
  });
  const audioSummarize = useQuery({
    queryKey: ["audioSummarize"],
    queryFn: () => summaryService.audioSummarize(whisper.data),
    enabled: false,
  });
  useEffect(() => {
    if (whisper.isSuccess) {
      audioSummarize.refetch();
    }
  }, [whisper.isSuccess]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    whisper.refetch();
  };
  const HandleFileChange = (e) => {
    if (!isAuth) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
    const audioFile = e.target.files[0];
    setFile(audioFile);
  };

  return (
    <MainWrapper>
      <FormHeader title={title} description={description} />
      <Form onSubmit={HandleSubmit}>
        <InputLabel htmlFor="fileInput">
          <LabelBtn htmlFor="fileInput">오디오 파일 업로드</LabelBtn>
          <FileInput
            id="fileInput"
            type="file"
            accept="audio/*"
            onChange={HandleFileChange}
          />
        </InputLabel>
        <FileName>{file?.name && `현재 파일: ${file.name}`}</FileName>
        <SubmitBtn type="submit">Summarize</SubmitBtn>
      </Form>
      {audioSummarize.isSuccess && audioSummarize.data && (
        <AudioSummarizeResult summaryData={audioSummarize.data} />
      )}
    </MainWrapper>
  );
};

export default AudioSummarizePage;
