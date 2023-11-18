import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: red;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration-line: underline;
  }
`;

const linkType = [
  {
    type: "youtube",
    message: "최근 유튜브 요약본 보러가기",
    path: "/recent/youtube",
  },
];

const RecentLink = ({ filter }) => {
  const [linkInfo, setLinkInfo] = useState({});
  useEffect(() => {
    const filtered = linkType.filter((item) => item.type === filter);
    setLinkInfo(filtered[0]);
  }, []);
  return <StyledLink to={linkInfo.path}>{linkInfo.message}</StyledLink>;
};

export default RecentLink;
