import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormHeader from "../../components/FormHeader";
import { useQuery } from "@tanstack/react-query";
import useSummaryService from "../../api/useSummaryService";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { data } from "./dummy";
import { userAtom } from "../../_state/user";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  width: 100%;
  padding: 0 24px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
const InputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 280px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;
`;
const LabelBtn = styled.button`
  padding: 12px 24px;
  color: white;
  background-color: #ffa600d3;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: orange;
  }
`;
const FileInput = styled.input`
  width: 0;
  height: 0;
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

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const WhisperResult = await summaryService.getTextFromWhisper(file);
    const body = {
      source_text: WhisperResult,
    };
    const summaryResult = await summaryService.audioSummarize(body);
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
          <LabelBtn>오디오 파일 업로드</LabelBtn>
        </InputLabel>
        <FileInput
          id="fileInput"
          type="file"
          accept="audio/*"
          onChange={HandleFileChange}
        />
        <SubmitBtn type="submit">Summarize</SubmitBtn>
      </Form>
    </MainWrapper>
  );
};

export default AudioSummarizePage;
