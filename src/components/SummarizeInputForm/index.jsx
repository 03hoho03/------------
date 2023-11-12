import React from "react";
import styled from "styled-components";
import { ReactComponent as Loader } from "../../assets/icons/loader.svg";
import { escapeRegExp } from "../../utils/function/getPattern";
import Button from "../../common/button";
import Form from "../../common/form";

const YouTubeSumForm = styled(Form)`
  margin-bottom: 24px;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  justify-content: space-between;
  &:focus-within {
    border-color: black;
  }
`;
const UrlInput = styled.input`
  width: 100%;
  margin-right: 12px;
  outline: none;
`;
const SubmitBtn = styled(Button)`
  padding: 8px 12px;
  background-color: #ffa500;
`;
const LoaderComponent = styled(Loader)`
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SummarizeInputForm = ({
  inputValue,
  setInputValue,
  setVideoId = null,
  isFetching = false,
  refetch = () => {},
}) => {
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const videoId = escapeRegExp(inputValue);
    setVideoId(videoId);
    refetch();
  };
  return (
    <YouTubeSumForm onSubmit={onHandleSubmit}>
      <InputWrapper>
        <UrlInput
          placeholder="유튜브 URL을 넣으세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SubmitBtn disabled={isFetching} isfetching={isFetching}>
          {isFetching ? <LoaderComponent /> : "Summarize"}
        </SubmitBtn>
      </InputWrapper>
    </YouTubeSumForm>
  );
};

export default SummarizeInputForm;
