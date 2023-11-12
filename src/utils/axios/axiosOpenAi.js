import axios from "axios";

const baseURL = new URL("https://api.openai.com/v1/audio/transcriptions");

const axiosOpenAi = axios.create({
  baseURL,
});

axiosOpenAi.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${process.env.REACT_APP_OPENAI_KEY}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosOpenAi };
