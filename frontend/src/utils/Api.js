class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(console.log(res.status));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      credentials: "include",
      headers: {
        authorization: `${this._headers.authorization}`,
      },
    }).then(this._checkResult);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        authorization: `${this._headers.authorization}`,
      },
    }).then(this._checkResult);
  }

  setUserInfo(obj) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      }),
    }).then(this._checkResult);
  }

  setNewCard(obj) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        link: obj.link,
      }),
    }).then(this._checkResult);
  }

  removeCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResult);
  }

  changeLikeCardStatus(idCard, isLiked) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResult);
  }

  setUserAvatar(obj) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.avatar,
      }),
    }).then(this._checkResult);
  }
}

const api = new Api({
  baseUrl: "http://api.mesto.prokhorov.nomoredomains.icu",
  credentials: "include",
  headers: {
    authorization: "e243774a-b776-426b-a71e-7cfaf249471c",
    "Content-Type": "application/json",
  },
});

export default api;
