import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { useUserService } from "../../../api/useUserService";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../../_state/user";
import AuthInput from "../AuthInput";
import Button from "../../../common/button";
import Form from "../../../common/form";
import { darken } from "polished";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 0 24px;
  @media screen and (min-width: 480px) {
    width: 480px;
  }
`;
const Title = styled.h3`
  margin-bottom: 24px;
`;
const LoginFormWrapper = styled(Form)`
  margin-bottom: 12px;
`;
const ButtonWrapper = styled(Button)`
  background-color: #ffa500;
  width: 100%;
  padding: 8px;
  ${(props) =>
    props.disabled &&
    css`
      background-color: ${darken(0.1, "#ffa500")};
      cursor: not-allowed !important;
    `}
  &:hover {
    background-color: ${darken(0.1, "#ffa500")};
  }
`;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const userService = useUserService();
  const { data, isFetching, refetch, error, isSuccess } = useQuery({
    queryKey: ["login"],
    queryFn: () => userService.login(watch("email"), watch("password")),
    enabled: false,
  });
  const setUser = useSetRecoilState(userAtom);
  useEffect(() => {
    if (isSuccess) {
      const { access_token, refresh_token, user } = data;
      sessionStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      setUser({ user, isAuth: true });
    } else {
      console.log(error);
    }
  }, [data, isSuccess]);
  const fields = {
    email: register("email", { pattern: /^\S+@\S+$/i }),
    password: register("password", { required: true }),
  };
  const onSubmit = async () => {
    refetch();
  };
  return (
    <MainWrapper>
      <Title>로그인</Title>
      <LoginFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          register={fields.email}
          labelSpan="이메일"
          placeholder="email@example.com"
          type="email"
        />
        <AuthInput
          register={fields.password}
          labelSpan="비밀번호"
          placeholder="비밀번호 입력"
          type="password"
        />
        <ButtonWrapper type="submit" disabled={isFetching}>
          로그인
        </ButtonWrapper>
      </LoginFormWrapper>
      <ButtonWrapper type="button" onClick={() => navigate("/signup")}>
        회원가입
      </ButtonWrapper>
    </MainWrapper>
  );
};

export default LoginForm;
