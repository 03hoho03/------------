import "./App.css";
import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SingupPage";
import RecentPage from "./pages/RecentPage";
import YouTubeSummarizePage from "./pages/YouTubeSummarizePage";
import RecentPostPage from "./pages/RecentPostPage";
import AudioSummarizePage from "./pages/AudioSummarizePage";
import NotAuthRoutes from "./components/NotAuthRoutes";
import Navigation from "./components/Header";
import { useRecoilState } from "recoil";
import { userAtom } from "./_state/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { getRefreshToken } from "./utils/axios/axiosInstance";

const MainWrapper = styled.div`
  width: 100%;
`;
const OutletWrapper = styled.main`
  display: flex;
  width: 100%;
  max-width: 1220px;
  margin: auto;
`;

function Layout() {
  return (
    <MainWrapper>
      <Navigation />
      <OutletWrapper>
        <ToastContainer
          position="bottom-right"
          theme="light"
          pauseOnHover
          autoClose={1500}
        ></ToastContainer>
        <Outlet />
      </OutletWrapper>
    </MainWrapper>
  );
}

function App() {
  const [user, setUser] = useRecoilState(userAtom);
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      localStorage.getItem("refreshToken") &&
      !sessionStorage.getItem("accessToken")
    ) {
      getRefreshToken();
    }
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<YouTubeSummarizePage />} />
        <Route path="/audio" element={<AudioSummarizePage />} />
        <Route path="/recent/:type" element={<RecentPage />} />
        <Route path="/recent/:type/:Id" element={<RecentPostPage />} />
        <Route element={<NotAuthRoutes />}>
          <Route index path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SingupPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
