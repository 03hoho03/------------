import axios from "axios";
import { deleteToken } from "../utils/deleteToken";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../_state/user";

const baseUrl = process.env.REACT_APP_BASE_URL;

export { useUserService };

const useUserService = () => {
  const setUser = useSetRecoilState(userAtom);
  return {
    login: async (email, password) => {
      const response = await axios
        .post(
          `${baseUrl}/login/`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data);

      return response;
    },
    logout: async () => {
      deleteToken();
      setUser({ user: null, isAuth: false });
    },
    register: async ({ email, password, password_confirm }) => {
      const body = {
        email,
        password1: password,
        password2: password_confirm,
      };
      const response = await axios.post(`${baseUrl}/registration/`, body, {
        withCredentials: true,
      });
      return response;
    },
  };
};
