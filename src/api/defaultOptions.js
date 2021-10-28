import { getTokenFromStore } from "../utils";

export const defaultOptions = () => {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenFromStore()}`,
    },
  };
};

export const UploadFileOptions = () => {
  return {
    headers: {
      Authorization: `Bearer ${getTokenFromStore()}`,
    },
  };
};
