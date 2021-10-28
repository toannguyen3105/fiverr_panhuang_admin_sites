import {
  FETCH_POST_ERROR,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
} from "../constants/postConstant";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: null,
};

function postReducers(state = initialState, { type, data, message }) {
  switch (type) {
    case FETCH_POST_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        data,
        requesting: false,
        success: true,
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        requesting: false,
        success: false,
        message,
      };
    default:
      return state;
  }
}

export default postReducers;
