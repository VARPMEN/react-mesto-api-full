export const BASE_URL = "https://api.mesto.prokhorov.nomoredomains.icu";

const handleResponse = (response) =>
  response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(handleResponse);
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(handleResponse);
};

export const logOut = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
