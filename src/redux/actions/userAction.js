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
import { defaultOptions, UploadFileOptions } from "../../api/defaultOptions";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadUsers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_REQUEST });

    const response = await fetch(`${baseUrl}users`, defaultOptions());
    const responseBody = await response.json();
    const { data } = responseBody;
    dispatch({ type: FETCH_USER_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, message: error });
  }
};

export const getUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_REQUEST });

    const response = await fetch(`${baseUrl}user/${userId}`, defaultOptions());
    const responseBody = await response.json();
    const { data } = responseBody;
    dispatch({ type: FETCH_USER_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, message: error });
  }
};

export const updateUser = (userId, user) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_REQUEST });

    const response = await fetch(`${baseUrl}user/${userId}`, {
      ...defaultOptions(),
      method: "PUT",
      body: JSON.stringify(user),
    });

    const responseBody = await response.json();
    const { data } = responseBody;
    dispatch({ type: FETCH_USER_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, message: error });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const response = await fetch(`${baseUrl}user/${userId}`, {
      ...defaultOptions(),
      method: "DELETE",
    });

    const responseBody = await response.json();
    const { message, status } = responseBody;

    if (status === 200) {
      alert(message);
      dispatch({ type: DELETE_USER_SUCCESS, message });
      dispatch(loadUsers());
    } else {
      alert(message);
      dispatch({ type: DELETE_USER_ERROR, message });
    }
  } catch (error) {
    dispatch({ type: DELETE_USER_ERROR, message: error });
  }
};

export const uploadImage = (selectedFile) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_AVATAR_REQUEST });

    const formData = new FormData();

    formData.append("file", selectedFile);
    const response = await fetch(`${baseUrl}upload`, {
      ...UploadFileOptions(),
      method: "POST",
      body: formData,
    });

    const responseBody = await response.json();
    const { data, message, status } = responseBody;

    if (status === 201) {
      alert(message);
      dispatch({ type: UPDATE_AVATAR_SUCCESS, data });
    } else {
      alert(message);
      dispatch({ type: UPDATE_AVATAR_ERROR, message });
    }
  } catch (error) {
    dispatch({ type: UPDATE_AVATAR_ERROR, message: error });
  }
};
