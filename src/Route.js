import * as routePath from "./Utils/RouteUrl";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

const DemoContainer = Loadable({
  loader: () => import("./Demo/Containers/DemoContainer.js"),
  loading() {
    return <div>Loading...</div>;
  }
});
const DemoAboutComponent = Loadable({
  loader: () => import("./Demo/Components/DemoAboutComponent"),
  loading() {
    return <div>Loading</div>;
  }
});
export default [
  {
    component: DemoContainer,
    path: routePath.HOME_ROUTE,
    exact: true
  },
  {
    component: DemoAboutComponent,
    path: routePath.ABOUT_BOILERPLATE
  }
];
