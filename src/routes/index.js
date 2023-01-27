import Home from "../pages/home";
import Catalog from "../pages/catalog";
import Detail from "../pages/detail";
export const routeList = [
  { path: "/", component: Home, exact: "exact" },
  { path: "/:category", component: Catalog },
  { path: "/:category/:id", component: Detail },
  { path: "/:category/search/:keyword", component: Catalog },
];
