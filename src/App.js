import "./App.scss";
import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import { routeList } from "./routes";
import Layout from "./layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routeList.map((route, index) => (
          <Route
            key={index}
            exact={route.exact ? "exact" : false}
            path={route.path}
            element={<Layout>{<route.component />}</Layout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
