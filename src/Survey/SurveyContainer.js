import { connect } from "react-redux";
import { getAllCandidates, createSurvey } from "../Admin/Actions/Admin.actions";
import { withRouter } from "react-router-dom";

import Survey from "./Survey";

const mapDispatchToProps = dispatch => {
  return {
    getAllCandidates: () => {
      return dispatch(getAllCandidates());
    },
    createSurvey: payload => {
      return dispatch(createSurvey(payload));
    }
  };
};
const mapStateToProps = state => {
  return {
    candidates: state.adminReducer.allCandidates
  };
};
const SurveyContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Survey)
);
export default SurveyContainer;
