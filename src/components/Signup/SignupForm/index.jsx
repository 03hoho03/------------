import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { useUserService } from "../../../api/useUserService";
import { useMutation } from "@tanstack/react-query";
import Button from "../../../common/button";
import { darken } from "polished";
import { useNavigate } from "react-router-dom";
import Form from "../../../common/form";
import AuthInput from "../../Login/AuthInput";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Title = styled.h3``;
const FormWrapper = styled(Form)``;
const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
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

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: "onChange" });
  const userService = useUserService();
  const navigate = useNavigate();
  const { data, mutate, mutateAsync, error } = useMutation({
    mutationFn: (userInfo) => userService.register(userInfo),
    onSuccess: () => navigate("/login"),
  });
  const fields = {
    email: register("email", {
      pattern: {
        value: /^\S+@\S+$/i,
        message: "이메일이 올바르지 않습니다.",
      },
    }),
    password: register("password", {
      required: true,
      minLength: {
        value: 6,
        message: "최소 6자 이상의 비밀번호를 설정해주세요.",
      },
    }),
    password_confirm: register("password_confirm", {
      required: true,
      minLength: {
        value: 6,
      },
    }),
  };
  const CheckSamePassword = (password, password_confirm) => {
    if (password !== password_confirm) {
      setError(
        "password_confirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
      return false;
    }
    return true;
  };
  const onSubmit = async ({ email, password, password_confirm }) => {
    if (!CheckSamePassword(password, password_confirm)) return;
    console.log("played");
    mutate({ email, password, password_confirm });
  };
  return (
    <MainWrapper>
      <TitleWrapper>
        <Title>회원가입</Title>
      </TitleWrapper>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
        <AuthInput
          register={fields.password_confirm}
          labelSpan="비밀번호 재확인"
          placeholder="비밀번호 입력"
          type="password"
        />
        <ErrorMessage>{errors?.password_confirm?.message}</ErrorMessage>
        <ButtonWrapper type="submit">회원가입</ButtonWrapper>
      </FormWrapper>
    </MainWrapper>
  );
};

export default SignupForm;
