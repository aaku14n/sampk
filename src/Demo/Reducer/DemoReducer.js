import * as demoActions from "../Actions/DemoAction";
const demoReducer = (
  state = {
    demoCount: 0,
    demoCountStatus: "",
    demoCountLoading: false,
    demoCountError: "",

    getDemoCountStatus: "",
    getDemoCountLoading: false,
    getDemoCountError: ""
  },
  action
) => {
  switch (action.type) {
    case demoActions.GET_REQUEST:
      return Object.assign({}, state, {
        getDemoCountStatus: action.status,
        getDemoCountLoading: true
      });
    case demoActions.GET_SUCCESS:
      return Object.assign({}, state, {
        demoCount: action.count,
        getDemoCountStatus: action.status,
        getDemoCountLoading: false
      });
    case demoActions.GET_FAILURE:
      return Object.assign({}, state, {
        getDemoCountStatus: action.status,
        getDemoCountLoading: false,
        getDemoCountError: action.error
      });
    case demoActions.ADD_REQUEST:
      return Object.assign({}, state, {
        demoCountStatus: action.status,
        demoCountLoading: true
      });
    case demoActions.ADD_SUCCESS:
      return Object.assign({}, state, {
        demoCount: state.demoCount + 1,
        demoCountStatus: action.status,
        demoCountLoading: false
      });
    case demoActions.ADD_FAILURE:
      return Object.assign({}, state, {
        demoCountStatus: action.status,
        demoCountLoading: false,
        demoCountError: action.error
      });
    default:
      return state;
  }
};

export default demoReducer;
