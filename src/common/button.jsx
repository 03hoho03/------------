import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.2s ease-in;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
