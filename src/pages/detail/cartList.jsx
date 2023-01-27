import { useParams } from "react-router-dom";
import tmdbApi from "../../service/tmdbApi";
import apiConfig from "../../service/apiConfig";
import { useEffect, useState } from "react";

function CastList(props) {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmdbApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 8));
    };
    getCredits();
  }, [category, props.id]);

  console.log(casts);
  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
            }}
          ></div>
          <p className="casts__item__name" style={{ textAlign: "center" }}>
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CastList;
