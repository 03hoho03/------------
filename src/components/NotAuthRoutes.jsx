import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../_state/user";

const NotAuthRoutes = () => {
  const { isAuth } = useRecoilValue(userAtom);
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default NotAuthRoutes;
