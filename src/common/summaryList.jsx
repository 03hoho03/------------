import React from "react";
import SummaryItem from "./summaryItem";
import styled from "styled-components";

const SummaryListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const SummaryList = ({ summaryList }) => {
  return (
    <SummaryListUl>
      {summaryList?.map((item, idx) => (
        <SummaryItem item={item} key={`${item.video_id}-${idx}`} />
      ))}
    </SummaryListUl>
  );
};

export default SummaryList;
