import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./configureStore.js";
import registerServiceWorker from "./registerServiceWorker";

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById("root")
    );
  });
};

const displayToastFunc = message => {
  ReactDOM.render(
    message,
    document.getElementById("service-worker-toast-root")
  );
  delay(() => {
    document.getElementById("service-worker-toast-root").innerHTML = "";
  }, 2000);
};
try {
  registerServiceWorker(displayToastFunc);
} catch (e) {
  console.log(e.message);
}
