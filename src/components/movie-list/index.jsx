import "./movieList.scss";
import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "../movie-card";

import tmdbApi, { category } from "../../service/tmdbApi";
import { useEffect, useState } from "react";

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(props.type, params);
            break;
          default:
            response = await tmdbApi.getTvList(props.type, params);
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }

      setItems(response.results);
    };

    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
