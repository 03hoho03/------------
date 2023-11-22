import { axiosInstance } from "../utils/axios/axiosInstance";
import { axiosOpenAi } from "../utils/axios/axiosOpenAi";

const useSummaryService = () => {
  return {
    youtubeSummarize: async (user, url) => {
      const email = user?.email ? user.email : "";
      const response = await axiosInstance
        .post(
          "api/summary/url/",
          {
            email,
            url,
          },
          {
            timeout: 200000,
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
      const formData = new FormData();
      formData.append("model", "whisper-1");
      formData.append("language", language);
      formData.append("file", file);
      const response = await axiosOpenAi.post("", formData).then((res) => {
        return res.data;
      });
      return response;
    },
    audioSummarize: async (whisperResult) => {
      const body = {
        source_text: whisperResult,
      };
      const response = await axiosInstance
        .post("api/summary/text/", body)
        .then((res) => {
          return res.data;
        });
      return response;
    },
  };
};

export default useSummaryService;
