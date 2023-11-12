import React from "react";
import RecentItem from "../../Recent/RecentItem";
import styled from "styled-components";

const RecentListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  width: 100%;
`;

const RecentList = ({ recentList }) => {
  return (
    <RecentListUl>
      {recentList?.map((item, idx) => (
        <RecentItem item={item} key={`${item.video_id}-${idx}`} />
      ))}
    </RecentListUl>
  );
};

export default RecentList;
