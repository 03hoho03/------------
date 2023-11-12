export { deleteToken };

const deleteToken = () => {
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
