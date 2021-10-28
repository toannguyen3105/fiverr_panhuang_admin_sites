import {
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
} from "../constants/authConstant";

const initialState = {
  authenticated: false,
  requesting: false,
  success: false,
  message: null,
  data: null,
};

function authReducers(state = initialState, { type, message }) {
  switch (type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        requesting: false,
        authenticated: true,
        success: true,
      };
    case FETCH_LOGIN_ERROR:
      return {
        ...state,
        requesting: false,
        authenticated: false,
        message,
      };
    default:
      return state;
  }
}

export default authReducers;
