import {
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
} from "../constants/productConstant";

const initialState = {
  requesting: false,
  success: false,
  createdSuccess: false,
  message: null,
  data: null,
};

function productReducers(state = initialState, { type, data, message }) {
  switch (type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        requesting: true,
        createdSuccess: false,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        data,
        requesting: false,
        success: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        data,
        requesting: false,
        createdSuccess: true,
      };
    case FETCH_PRODUCT_ERROR:
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

export default productReducers;
