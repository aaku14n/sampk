import { connect } from "react-redux";
import withRouter from "react-router-dom/withRouter";
import AdminDashboard from "../Components/AdminDashboard";
import { createCandidate } from "../Actions/Admin.actions";
const mapDispatchToProps = dispatch => {
  return {
    createCandidate: payload => {
      return dispatch(createCandidate(payload));
    }
  };
};
const mapStateToProps = state => {
  return {
    authDetails: state.adminReducer.authDetails
  };
};

const AdminDashboardContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminDashboard)
);
export default AdminDashboardContainer;
