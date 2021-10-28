import {
  FETCH_TRANSACTION_ERROR,
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
} from "../constants/transactionConstant";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: null,
};

function transactionReducers(state = initialState, { type, data, message }) {
  switch (type) {
    case FETCH_TRANSACTION_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data,
      };
    case FETCH_TRANSACTION_ERROR:
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

export default transactionReducers;
