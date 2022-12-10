export default class Api {
  constructor() {
    this._token = 'dada8704-016b-43db-b43a-5dfe373a30d9';
    this._queryBase = 'https://mesto.nomoreparties.co/v1/cohort-55'
  }

  getUserData() {
    const query = this._queryBase + '/users/me';
    return fetch(query, {
      headers: {
        authorization: this._token
      }
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
    const query = this._queryBase + '/users/me';
    return fetch(query, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
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
    const query = this._queryBase + '/users/me/avatar';
    return fetch(query, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
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
    const query = this._queryBase + '/cards';
    return fetch(query, {
      headers: {
        authorization: this._token
      }
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
    const query = this._queryBase + '/cards';
    return fetch(query, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
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
    const query = this._queryBase + '/cards' +`/${cardId}`;
    return fetch(query, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
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
    const query = this._queryBase + '/cards' +`/${cardId}` + '/likes';
    return fetch(query, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
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
    const query = this._queryBase + '/cards' +`/${cardId}` + '/likes';
    return fetch(query, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
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



}
