import {
  FETCH_CONFIGURATION_ERROR,
  FETCH_CONFIGURATION_REQUEST,
  FETCH_CONFIGURATION_SUCCESS,
} from "../constants/configurationConstant";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: null,
};

function configurationReducers(state = initialState, { type, data, message }) {
  switch (type) {
    case FETCH_CONFIGURATION_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case FETCH_CONFIGURATION_SUCCESS:
      return {
        ...state,
        requesting: false,
        data,
        success: true,
      };

    case FETCH_CONFIGURATION_ERROR:
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

export default configurationReducers;
