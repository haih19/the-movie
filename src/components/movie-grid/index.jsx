import "./movieGrid.scss";

import MovieCard from "../movie-card";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../service/tmdbApi";
import Button, { OutlineButton } from "../button";
import Input from "../input";

function MovieGrid(props) {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  const loadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMovieList(movieType.upcoming, params);
          break;

        default:
          response = await tmdbApi.getTvList(tvType.popular, params);
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      try {
        response = await tmdbApi.search(props.category, params);
      } catch (e) {
        console.log("search e: ", e);
      }
    }

    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(movieType.upcoming, params);
            break;

          default:
            response = await tmdbApi.getTvList(tvType.popular, params);
        }
      } else {
        const params = {
          query: keyword,
        };
        try {
          response = await tmdbApi.search(props.category, params);
        } catch (e) {
          console.log("search e: ", e);
        }
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [props.category, keyword]);
  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard category={props.category} item={item} key={index} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
}

const MovieSearch = (props) => {
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const navigate = useNavigate();
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, navigate, props.category]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);

    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
