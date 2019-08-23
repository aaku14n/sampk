import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DemoComponent from "../Components/DemoComponent";
import { add, getDemoCount } from "../Actions/DemoAction";
const mapDispatchToProps = dispatch => {
  return {
    add: () => {
      dispatch(add());
    },
    getDemoCount: () => {
      dispatch(getDemoCount());
    }
  };
};
const mapStateToProps = state => {
  return {
    demoReducer: state.demoReducer
  };
};
const DemoContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DemoComponent)
);
export default DemoContainer;
