import { useState } from "react";
import tmdbApi from "../../service/tmdbApi";

function Test() {
  const [searchText, setSearchText] = useState("");

  const search = async () => {
    try {
      const response = await tmdbApi.search("movie", { query: "captain" });
      console.log(response);
    } catch (e) {
      console.log("search e: ", e);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={search}>search</button>
    </div>
  );
}

export default Test;
