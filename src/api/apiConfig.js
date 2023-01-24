import { API_KEY, SERVICE_API } from "../common/constant";

const apiConfig = {
  baseUrl: SERVICE_API,
  apiKey: API_KEY,
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
