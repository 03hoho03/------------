import React from "react";
import styled from "styled-components";

const MainWrapper = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;
const AudioSummarizeResult = ({ summaryData }) => {
  return <MainWrapper>{summaryData.summary}</MainWrapper>;
};

export default AudioSummarizeResult;
