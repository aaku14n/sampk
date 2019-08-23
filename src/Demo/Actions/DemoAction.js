import { REQUESTING, SUCCESS, FAILURE } from "../../Utils/Contaants";

export const ADD_REQUEST = "add_request";
export const ADD_SUCCESS = "add_success";
export const ADD_FAILURE = "add_failure";

export const GET_REQUEST = "GET_request";
export const GET_SUCCESS = "GET_success";
export const GET_FAILURE = "GET_failure";

export function getDemoCount() {
  return async (dispatch, getState, { api }) => {
    dispatch({
      type: GET_REQUEST,
      status: REQUESTING
    });
    try {
      // do api call here
      await setTimeout(
        () =>
          dispatch({
            type: GET_SUCCESS,
            status: SUCCESS,
            count: 5
          }),
        2000
      );
    } catch (e) {
      dispatch({
        type: GET_FAILURE,
        status: FAILURE,
        error: e.message
      });
    }
  };
}

export function add() {
  return async (dispatch, getState, { api }) => {
    dispatch({
      type: ADD_REQUEST,
      status: REQUESTING
    });
    try {
      // do api call here
      dispatch({
        type: ADD_SUCCESS,
        status: SUCCESS
      });
    } catch (e) {
      dispatch({
        type: ADD_FAILURE,
        status: FAILURE,
        error: e.message
      });
    }
  };
}
