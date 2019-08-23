import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_ERROR,
  GET_ALL_CANDIDATES_REQUEST,
  GET_ALL_CANDIDATES_SUCCESS,
  GET_ALL_CANDIDATES_ERROR
} from "../Actions/Admin.actions";
import { ADMIN_AUTH_LOCAL_STORAGE } from "../../Utils/Contaants";

const adminReducer = (
  state = {
    adminAuthDetails: "",
    adminLoginLoading: false,
    adminLoginError: "",

    allCandidates: "",
    getAllCandidatesLoading: false,
    getAllCandidatesError: ""
  },
  action
) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return Object.assign({}, state, {
        adminLoginLoading: true
      });
    case ADMIN_LOGIN_SUCCESS:
      localStorage.setItem(ADMIN_AUTH_LOCAL_STORAGE, action.authDetails.token);
      return Object.assign({}, state, {
        adminAuthDetails: action.authDetails,
        adminLoginLoading: false
      });
    case ADMIN_LOGIN_ERROR:
      return Object.assign({}, state, {
        adminLoginLoading: false,
        adminLoginError: action.error
      });
    case GET_ALL_CANDIDATES_REQUEST:
      return Object.assign({}, state, {
        getAllCandidatesLoading: true
      });
    case GET_ALL_CANDIDATES_SUCCESS:
      return Object.assign({}, state, {
        allCandidates: action.candidates,
        getAllCandidatesLoading: false
      });
    case GET_ALL_CANDIDATES_ERROR:
      return Object.assign({}, state, {
        getAllCandidatesLoading: false,
        getAllCandidatesError: action.error
      });
    default:
      return state;
  }
};

export default adminReducer;
