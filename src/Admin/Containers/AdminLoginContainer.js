import { connect } from "react-redux";
import withRouter from "react-router-dom/withRouter";
import AdminLogin from "../Components/AdminLogin";
import { adminLogin } from "../Actions/Admin.actions";
const mapDispatchToProps = dispatch => {
  return {
    adminLogin: payload => {
      return dispatch(adminLogin(payload));
    }
  };
};
const AdminLoginContainer = withRouter(
  connect(
    "",
    mapDispatchToProps
  )(AdminLogin)
);
export default AdminLoginContainer;
