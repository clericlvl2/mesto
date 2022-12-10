export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._userNameElement = document.querySelector(nameSelector);
    this._userDescriptionElement = document.querySelector(descriptionSelector);
    this._userAvatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
      userAvatar: this._userAvatarElement.src
    }
  }

  setUserInfo({ userName, userDescription, userAvatar}) {
    if (userName) {
      this._userNameElement.textContent = userName;
    }
    if (userDescription) {
      this._userDescriptionElement.textContent = userDescription;
    }
    if (userAvatar) {
      this._userAvatarElement.src = userAvatar;
    }
  }
}
