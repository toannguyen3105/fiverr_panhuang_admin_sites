export const getTokenFromStore = () => {
  return JSON.parse(localStorage.getItem("access_token"));
};

export const setTokenToStore = (access_token) => {
  localStorage.setItem("access_token", JSON.stringify(access_token));
};
