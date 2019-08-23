import React from "react";
import DemoHeader from "./DemoHeader";
import styles from "./css/DemoAboutComponent.css";
const DemoAboutComponent = () => {
  return (
    <React.Fragment>
      <DemoHeader />
      <div className={styles.base}>
        <h1>Thanx For visiting This</h1>
      </div>
    </React.Fragment>
  );
};
export default DemoAboutComponent;
