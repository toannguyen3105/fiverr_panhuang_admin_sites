import {
  FETCH_TRANSACTION_ERROR,
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
} from "../constants/transactionConstant";
import { defaultOptions } from "../../api/defaultOptions";

export const loadTransactions = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TRANSACTION_REQUEST });

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const response = await fetch(`${baseUrl}transactions`, defaultOptions());
    const responseBody = await response.json();
    const { data } = responseBody;
    dispatch({ type: FETCH_TRANSACTION_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FETCH_TRANSACTION_ERROR, message: error });
  }
};
