import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./css/DemoHeader.css";
import { HOME_ROUTE, ABOUT_BOILERPLATE } from "../../Utils/RouteUrl";
const DemoHeader = props => {
  return (
    <div className={styles.base}>
      <div
        className={styles.headerItem}
        onClick={() => props.history.push(HOME_ROUTE)}
      >
        Home
      </div>
      <div
        className={styles.headerItem}
        onClick={() => props.history.push(ABOUT_BOILERPLATE)}
      >
        About Boilerplate
      </div>
    </div>
  );
};
export default withRouter(DemoHeader);
