import { useParams } from "react-router-dom";
import tmdbApi from "../../service/tmdbApi";
import { useEffect, useRef, useState } from "react";

function VideoList(props) {
  const { category } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await tmdbApi.getVideos(category, props.id);
        setVideos(response.request.slice(0, 5));
      } catch (e) {
        console.log("e: ", e);
      }
    };
    getVideos();
  }, [category, props.id]);

  return (
    <>
      {videos.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
}

const Video = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
