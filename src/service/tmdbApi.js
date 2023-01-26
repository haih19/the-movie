import axiosClient from "./axiosClient";
import { API_KEY } from "../common/constant";
import queryString from "query-string";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMovieList: (type, params) => {
    const url =
      "movie/" +
      movieType[type] +
      `?api_key=${API_KEY}&` +
      queryString.stringify(params);
    return axiosClient.get(url);
  },
  getTvList: (type, params) => {
    const url =
      "tv/" +
      tvType[type] +
      `?api_key=${API_KEY}&` +
      queryString.stringify(params);
    return axiosClient.get(url);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + `/videos?api_key=${API_KEY}`;
    return axiosClient.get(url);
  },
  search: (cate, params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
