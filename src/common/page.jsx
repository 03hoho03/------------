import React from "react";
import styled from "styled-components";

const PageSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageContainer = ({ children }) => {
  return <PageSection>{children}</PageSection>;
};

export default PageContainer;
