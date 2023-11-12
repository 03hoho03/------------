import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../_state/user";

const ProtectedRoutes = () => {
  const { isAuth } = useRecoilValue(userAtom);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
