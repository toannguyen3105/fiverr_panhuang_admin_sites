import {
  CREATE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
} from "../constants/productConstant";
import { defaultOptions } from "../../api/defaultOptions";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_REQUEST });

    const response = await fetch(`${baseUrl}/items`, defaultOptions());
    const responseBody = await response.json();
    const { data } = responseBody;
    dispatch({ type: FETCH_PRODUCT_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_ERROR, message: error });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_REQUEST });

    const response = await fetch(`${baseUrl}/items`, {
      ...defaultOptions(),
      method: "POST",
      body: JSON.stringify(product),
    });

    const responseBody = await response.json();
    const { status, error, result } = responseBody;

    if (status === "OK") {
      alert(`Product name ${product.name} has created`);
      dispatch({ type: CREATE_PRODUCT_SUCCESS, result });
    } else {
      dispatch({ type: FETCH_PRODUCT_ERROR, message: error });
    }
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_ERROR, message: error });
  }
};

export const confirmProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_REQUEST });

    const response = await fetch(`${baseUrl}/items/update-status/${id}`, {
      ...defaultOptions(),
      method: "PUT",
    });

    const responseBody = await response.json();
    const { error, status } = responseBody;

    if (status === "OK") {
      alert(`Product id ${id} has updated`);
      dispatch(loadProducts());
    } else {
      alert(error);
    }
  } catch (error) {
    alert(error);
  }
};
