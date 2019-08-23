import { connect } from "react-redux";
import { addQuestion } from "../Actions/Admin.actions";
import { withRouter } from "react-router-dom";
import AdminAddQuestion from "../Components/AdminAddQuestion";
const mapDispatchToProps = dispatch => {
  return {
    addQuestion: payload => {
      return dispatch(addQuestion(payload));
    }
  };
};

const mapStateToProps = state => {
  return {
    adminReducer: state.adminReducer
  };
};
const AdminAddQuestionContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminAddQuestion)
);
export default AdminAddQuestionContainer;
