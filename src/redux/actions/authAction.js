import { setTokenToStore } from "../../utils";
import {
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
} from "../constants/authConstant";

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LOGIN_REQUEST });

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const responseBody = await response.json();
    const { result } = responseBody;

    if (result?.access_token) {
      dispatch({ type: FETCH_LOGIN_SUCCESS });
      setTokenToStore(result?.access_token);
    }
  } catch (error) {
    dispatch({ type: FETCH_LOGIN_ERROR, message: error });
  }
};
