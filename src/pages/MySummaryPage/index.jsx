import React from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../_state/user";
import { useQuery } from "@tanstack/react-query";
import { useUserService } from "../../api/useUserService";
import SummaryList from "../../common/summaryList";

const MySummaryPage = () => {
  const { user } = useRecoilValue(userAtom);
  const userService = useUserService();

  const { isFetching, data } = useQuery({
    queryKey: ["mySummaries"],
    queryFn: () => userService.getSummary(user.email),
  });

  return (
    <div>
      {isFetching ? <p>로딩중...</p> : <SummaryList summaryList={data} />}
    </div>
  );
};

export default MySummaryPage;
