import { connect } from "react-redux";
import { getAllCandidates } from "../Admin/Actions/Admin.actions";
import { withRouter } from "react-router-dom";
import LandingPage from "./LangingPage";

const mapDispatchToProps = dispatch => {
  return {
    getAllCandidates: () => {
      return dispatch(getAllCandidates());
    }
  };
};
const mapStateToProps = state => {
  return {
    candidates: state.adminReducer.allCandidates
  };
};
const LandingPageContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LandingPage)
);
export default LandingPageContainer;
