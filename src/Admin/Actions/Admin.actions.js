export const ADMIN_LOGIN_REQUEST = "ADMIN_LOGIN_REQUEST";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
export const ADMIN_LOGIN_ERROR = "ADMIN_LOGIN_ERROR";

export const CREATE_CANDIDATE_REQUEST = "CREATE_CANDIDATE_REQUEST";
export const CREATE_CANDIDATE_SUCCESS = "CREATE_CANDIDATE_SUCCESS";
export const CREATE_CANDIDATE_ERROR = "CREATE_CANDIDATE_ERROR";

export const ADD_QUESTION_REQUEST = "ADD_QUESTION_REQUEST";
export const ADD_QUESTION_SUCCESS = "ADD_QUESTION_SUCCESS";
export const ADD_QUESTION_ERROR = "ADD_QUESTION_ERROR";

export const GET_ALL_CANDIDATES_REQUEST = "GET_ALL_CANDIDATES_REQUEST";
export const GET_ALL_CANDIDATES_SUCCESS = "GET_ALL_CANDIDATES_SUCCESS";
export const GET_ALL_CANDIDATES_ERROR = "GET_ALL_CANDIDATES_ERROR";

export const CREATE_SURVEY_REQUEST = "CREATE_SURVEY_REQUEST";
export const CREATE_SURVEY_SUCCESS = "CREATE_SURVEY_SUCCESS";
export const CREATE_SURVEY_ERROR = "CREATE_SURVEY_ERROR";

export function adminLogin(payload) {
  return async (dispatch, getState, { api }) => {
    dispatch({
      type: ADMIN_LOGIN_REQUEST
    });
    try {
      const result = await api.post("admin/login", payload);
      const resultJson = await result.json();
      console.log(resultJson);
      if (result.status > 300) {
        throw new Error(resultJson.error);
      }
      return dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        authDetails: resultJson
      });
    } catch (e) {
      return dispatch({
        type: ADMIN_LOGIN_ERROR,
        error: e.message
      });
    }
  };
}
export function createCandidate(payload) {
  return async (dispatch, getState, { api }) => {
    dispatch({
      type: CREATE_CANDIDATE_REQUEST
    });
    try {
      const result = await api.post("createCandidate", payload);
      const resultJson = await result.json();
      console.log(resultJson);
      if (result.status > 300) {
        throw new Error(resultJson.error);
      }
      return dispatch({
        type: CREATE_CANDIDATE_SUCCESS,
        candidateDetails: resultJson.data
      });
    } catch (e) {
      return dispatch({
        type: CREATE_CANDIDATE_ERROR,
        error: e.message
      });
    }
  };
}

export function addQuestion(payload) {
  return async (dispatch, getState, { api }) => {
    dispatch({
      type: ADD_QUESTION_REQUEST
    });
    try {
      const result = await api.post(
        `addQuestion/${payload.candidateId}`,
        payload
      );
      const resultJson = await result.json();

      if (result.status > 300) {
        throw new Error(resultJson.error);
      }
      return dispatch({
        type: ADD_QUESTION_SUCCESS,
        candidateDetails: resultJson.data
      });
    } catch (e) {
      return dispatch({
        type: ADD_QUESTION_ERROR,
        error: e.message
      });
    }
  };
}
export function getAllCandidates(payload) {
  return async (dispatch, getState, { api }) => {
    dispatch({
      type: GET_ALL_CANDIDATES_REQUEST
    });
    try {
      const result = await api.get(`getAllCandidates`, payload);
      const resultJson = await result.json();

      if (result.status > 300) {
        throw new Error(resultJson.error);
      }
      return dispatch({
        type: GET_ALL_CANDIDATES_SUCCESS,
        candidates: resultJson
      });
    } catch (e) {
      return dispatch({
        type: GET_ALL_CANDIDATES_ERROR,
        error: e.message
      });
    }
  };
}

export function createSurvey(payload) {
  return async (dispatch, getState, { api }) => {
    dispatch({
      type: CREATE_SURVEY_REQUEST
    });
    try {
      const result = await api.post(
        `createSurvey/${payload.candidateId}`,
        payload
      );
      const resultJson = await result.json();

      if (result.status > 300) {
        throw new Error(resultJson.error);
      }
      return dispatch({
        type: CREATE_SURVEY_SUCCESS,
        candidates: resultJson
      });
    } catch (e) {
      return dispatch({
        type: CREATE_SURVEY_ERROR,
        error: e.message
      });
    }
  };
}
