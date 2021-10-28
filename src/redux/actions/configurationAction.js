import {
  FETCH_CONFIGURATION_ERROR,
  FETCH_CONFIGURATION_REQUEST,
  FETCH_CONFIGURATION_SUCCESS,
} from "../constants/configurationConstant";
import { defaultOptions } from "../../api/defaultOptions";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadConfigurations = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CONFIGURATION_REQUEST });

    const response = await fetch(`${baseUrl}configs`, defaultOptions());
    const responseBody = await response.json();
    const { data } = responseBody;
    dispatch({ type: FETCH_CONFIGURATION_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FETCH_CONFIGURATION_ERROR, message: error });
  }
};

export const getConfiguration = (configId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CONFIGURATION_REQUEST });

    const response = await fetch(
      `${baseUrl}config/${configId}`,
      defaultOptions()
    );
    const responseBody = await response.json();
    const { data } = responseBody;
    dispatch({ type: FETCH_CONFIGURATION_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FETCH_CONFIGURATION_ERROR, message: error });
  }
};

export const updateConfiguration = (configId, config) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CONFIGURATION_REQUEST });

    const response = await fetch(`${baseUrl}config/${configId}`, {
      ...defaultOptions(),
      method: "PUT",
      body: JSON.stringify(config),
    });

    const responseBody = await response.json();
    const { data } = responseBody;
    dispatch({ type: FETCH_CONFIGURATION_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FETCH_CONFIGURATION_ERROR, message: error });
  }
};

export const deleteConfiguration = (configId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CONFIGURATION_REQUEST });

    const response = await fetch(`${baseUrl}config/${configId}`, {
      ...defaultOptions(),
      method: "DELETE",
    });

    const responseBody = await response.json();
    const { message, status } = responseBody;

    if (status === 200) {
      alert(message);
      dispatch(loadConfigurations());
    } else {
      alert(message);
    }
  } catch (error) {
    alert(error);
  }
};
