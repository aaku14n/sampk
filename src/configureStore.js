import thunk from "redux-thunk";
import * as api from "./lib/apiRequest";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import demoReducer from "./Demo/Reducer/DemoReducer";
import adminReducer from "./Admin/Reducer/Admin.reducer";
let composeEnhancers = compose;
let preloadedState = {};

if (typeof window !== "undefined") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  preloadedState = window.INITIAL_STATE || {};
  delete window.INITIAL_STATE;
}
const rootReducer = combineReducers({ demoReducer, adminReducer });

let store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({
        api
      })
    )
  )
);
export default store;
