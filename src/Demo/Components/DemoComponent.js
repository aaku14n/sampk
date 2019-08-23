import React from "react";
import styles from "./css/DemoComponent.css";
import DemoHeader from "./DemoHeader";
import ReactHelmet from "react-helmet";
import { getDemoCount } from "../Actions/DemoAction";
class DemoComponent extends React.Component {
  static fetching({ dispatch, path }) {
    return [dispatch(getDemoCount(path.substr(1)))];
  }
  render() {
    return (
      <React.Fragment>
        <ReactHelmet>
          <meta
            name="description"
            content={`Free Web react app ${this.props.demoReducer.demoCount}`}
          />
          <title>Home</title>
          <meta name="keywords" content="React Boilerplat,Reactjs,Javascript" />
          <meta name="author" content="Aakarsh Yadav" />
        </ReactHelmet>
        <DemoHeader />
        <div className={styles.base}>
          <h1>A Universal React Boilerplate </h1>
          <div className={styles.details}>
            <ul>
              <li>Server Side Rendering.</li>
              <li>Code Splitting.</li>
              <li>Load Chunks on Demand.</li>
              <li>Service worker implemented for production build.</li>
              <li>Redux implemented.</li>
              <li>Simple and Best Folder Architecure .</li>
            </ul>
          </div>
          <div className={styles.reduxPortion}>
            <h1>Redux (action and reducer)</h1>
            <h3>{this.props.demoReducer.demoCount}</h3>
            <p onClick={() => this.props.add()} className={styles.button}>
              Add Me
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default DemoComponent;
