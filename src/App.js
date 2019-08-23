import React from "react";
import * as routePath from "./Utils/RouteUrl";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import LandingPage from "./Landing/LangingPage";
import AdminLoginContainer from "./Admin/Containers/AdminLoginContainer";
import AdminDashboardContainer from "./Admin/Containers/AdminDashboardContainer";
import AdminAddQuestionContainer from "./Admin/Containers/AdminAddQuestionContainer";
import LandingPageContainer from "./Landing/LandingPageContainer";
import SurveyContainer from "./Survey/SurveyContainer";
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

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={routePath.HOME_ROUTE}
          component={LandingPageContainer}
        />
        <Route
          exact
          path={routePath.ADMIN_LOGIN}
          component={AdminLoginContainer}
        />

        <Route
          exact
          path={routePath.ADMIN_DASHBOARD}
          component={AdminDashboardContainer}
        />
        <Route exact path={routePath.SURVEY_PATH} component={SurveyContainer} />

        <Route
          exact
          path={routePath.ADD_QUESTION_PATH}
          component={AdminAddQuestionContainer}
        />
        <Route
          path={routePath.ABOUT_BOILERPLATE}
          component={DemoAboutComponent}
        />
      </Switch>
    );
  }
}
export default App;
