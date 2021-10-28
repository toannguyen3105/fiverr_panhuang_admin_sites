import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_AVATAR_ERROR,
  UPDATE_AVATAR_SUCCESS,
  UPLOAD_AVATAR_REQUEST,
} from "../constants/userConstant";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: null,
};

function userReducers(state = initialState, { type, data, message }) {
  switch (type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        data,
        requesting: false,
        success: true,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        requesting: false,
        success: false,
        message,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        message,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        requesting: false,
        success: false,
        message,
      };
    case UPLOAD_AVATAR_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case UPDATE_AVATAR_SUCCESS: {
      return {
        ...state,
        requesting: false,
        success: true,
        data: {
          ...state.data,
          avatar: data,
        },
      };
    }
    case UPDATE_AVATAR_ERROR: {
      return {
        ...state,
        requesting: false,
        success: false,
        message,
      };
    }

    default:
      return state;
  }
}

export default userReducers;
