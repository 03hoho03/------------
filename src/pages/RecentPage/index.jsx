import React from "react";
import { useParams } from "react-router-dom";
import YouTubeRecent from "../../components/Recent/YouTubeRecent";

const RecentPage = () => {
  const { type } = useParams();
  return type === "youtube" ? <YouTubeRecent /> : <></>;
};

export default RecentPage;
