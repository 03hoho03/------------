import React from "react";
import styled from "styled-components";

const PageDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;
const PageTitle = styled.h3`
  color: black;
  margin-bottom: 24px;
  font-size: 32px;
`;
const PageDescription = styled.p`
  font-size: 14px;
`;
const FormHeader = ({ title, description }) => {
  return (
    <PageDescriptionWrapper>
      <PageTitle>{title}</PageTitle>
      <PageDescription>{description}</PageDescription>
    </PageDescriptionWrapper>
  );
};

export default FormHeader;
