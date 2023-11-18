import { axiosInstance } from "../utils/axios/axiosInstance";
import { axiosOpenAi } from "../utils/axios/axiosOpenAi";

const useSummaryService = () => {
  return {
    youtubeSummarize: async (user, url) => {
      const email = user.email ? user.email : "";
      const response = await axiosInstance
        .post(
          "api/summary/url/",
          {
            email,
            url,
          },
          {
            timeout: 50000,
          }
        )
        .then((res) => res.data);
      return response;
    },
    youtubeRecent: async () => {
      const response = await axiosInstance
        .get("api/summary/recent/")
        .then((res) => res.data.summaries);
      return response;
    },
    getTextFromWhisper: async (file, language = "en") => {
      console.log(file, language);
      try {
        const formData = new FormData();
        formData.append("model", "whisper-1");
        formData.append("language", language);
        formData.append("file", file);
        const response = await axiosOpenAi.post("", formData).then((res) => {
          console.log(res);
          return res.data;
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    audioSummarize: async (file) => {
      try {
        const response = await axiosInstance
          .post("api/summary/text/", file)
          .then((res) => {
            console.log(res);
            return res.data;
          });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export default useSummaryService;
