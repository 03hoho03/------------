import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const REFRESH_URL = `${baseURL}/token/refresh/`;

const axiosInstance = axios.create({
  baseURL,
});

const getRefreshToken = async () => {
  try {
    const preRefreshToken = localStorage.getItem("refreshToken");
    const { access } = await axiosInstance
      .post(REFRESH_URL, {
        refresh: preRefreshToken,
      })
      .then((res) => res.data);

    sessionStorage.setItem("accessToken", access);

    return access;
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

axiosInstance.interceptors.request.use(
  function (config) {
    if (!config.headers) return config;

    if (config.url !== REFRESH_URL) {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;
    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
      return Promise.reject(error);
    }

    config.sent = true;
    const accessToken = await getRefreshToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log(config);
    return axios(config);
  }
);

export { axiosInstance, getRefreshToken };
