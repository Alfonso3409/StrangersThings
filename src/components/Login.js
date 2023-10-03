function logIn(token) {
  localStorage.setItem("token", token);
}

function logOut() {
  localStorage.removeItem("token");
}

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

function makeHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

export { logIn, logOut, isLoggedIn, makeHeaders };
