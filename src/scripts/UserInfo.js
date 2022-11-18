export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._userNameElement = document.querySelector(nameSelector);
    this._userDescriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent
    }
  }

  setUserInfo({ userName, userDescription }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
  }
}
