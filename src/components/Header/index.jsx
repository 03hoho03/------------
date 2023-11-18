import React from "react";
import styled from "styled-components";
import { useUserService } from "../../api/useUserService";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../_state/user";

const MainWrapper = styled.section`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: inherit;
  border-bottom: 1px solid #ccc;
  justify-content: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 12px;
`;
const NavigationBtn = styled.button`
  background-color: inherit;
  border: none;
  border-radius: 18px;
  color: black;
  font-weight: bold;
  font-size: 14px;
`;

const Navigation = () => {
  const navigate = useNavigate();
  const userService = useUserService();
  const { user, isAuth } = useRecoilValue(userAtom);

  const HandleNavBtn = (path) => {
    navigate(path);
  };
  const HandleLogout = () => {
    userService.logout();
  };
  return (
    <MainWrapper>
      <ButtonWrapper>
        <NavigationBtn onClick={() => HandleNavBtn("/")}>
          유튜브 요약
        </NavigationBtn>
        <NavigationBtn onClick={() => HandleNavBtn("/audio")}>
          오디오파일 요약
        </NavigationBtn>
      </ButtonWrapper>
      <ButtonWrapper>
        {isAuth ? (
          <div>
            <NavigationBtn
              onClick={() => HandleNavBtn(`summary/${user.email}`)}
            >
              내 요약
            </NavigationBtn>
            <NavigationBtn onClick={HandleLogout}>로그아웃</NavigationBtn>
          </div>
        ) : (
          <NavigationBtn onClick={() => HandleNavBtn("/login")}>
            로그인
          </NavigationBtn>
        )}
      </ButtonWrapper>
    </MainWrapper>
  );
};

export default Navigation;
