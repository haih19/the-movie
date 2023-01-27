import { useParams } from "react-router-dom";
import MovieGrid from "../components/movie-grid";
import PageHeader from "../components/page-header";

import { category as cate } from "../service/tmdbApi";

function Catalog() {
  const { category } = useParams();
  return (
    <>
      <PageHeader>
        {category === cate.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
}

export default Catalog;
