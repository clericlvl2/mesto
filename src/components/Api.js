export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ошибка ${res.status}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ошибка  ${res.status}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ошибка ${res.status}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  getAllCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Что-то пошло не так: ошибка ${res.status}`)
      })
      .catch(err => {
        console.error(err);
      })
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ошибка ${res.status}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ошибка ${res.status}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  setCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ошибка ${res.status}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  unsetCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ошибка ${res.status}`);
      })
      .catch(err => {
        console.error(err);
      });
  }

  initializeAppData() {
    return Promise.all([
      this.getUserData(),
      this.getAllCards()
    ])
      .catch(err => {
        console.error(err);
      })
  }
}
