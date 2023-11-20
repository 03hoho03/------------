import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const YouTubeWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: calc(100% / 16 * 9);
`;
const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Youtube = ({ videoId }) => {
  return (
    <YouTubeWrapper>
      <Player
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="100%"
      />
    </YouTubeWrapper>
  );
};

export default Youtube;
