export default class Card {
  constructor({
      cardData,
      userData,
      cardClickHandler,
      likeClickHandler,
      deleteClickHanker
    }, cardTemplateId) {
    this._templateSelector = cardTemplateId;
    this._cardClickHandler = cardClickHandler;
    this._deleteClickHandler = deleteClickHanker;
    this._likeClickHandler = likeClickHandler;
    this._card = null;
    this._cardTitle = null;
    this._cardImage = null;
    this._likeButton = null;
    this._likeIndicator = null;
    this._deleteButton = null;
    this._hasUserLike = null;
    this._likesList = cardData.likes;
    this._likesValue = this._likesList.length;
    this._cardId = cardData._id;
    this._titleText = cardData.name;
    this._imageLink = cardData.link;
    this._userId = userData._id;
    this._isUserOwner = this._userId === cardData.owner._id;
  }

  _getCardTemplate() {
    return document
      .getElementById(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _checkUserLike() {
    return this._likesList.some(listedUser => listedUser._id === this._userId);
  }

  _updateLikeButtonView() {
    if (this._hasUserLike) {
      this._likeButton.classList.add('card__btn-like_active');
    } else {
      this._likeButton.classList.remove('card__btn-like_active');
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeClickHandler(this, this._hasUserLike)
    });
    this._cardImage.addEventListener('click', () => {
      this._cardClickHandler(this._imageLink, this._titleText);
    });
    if (this._isUserOwner) {
      this._deleteButton.addEventListener('click', () => {
        this._deleteClickHandler(this);
      });
    }
  }

  generateCard() {
    this._card = this._getCardTemplate();
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardImage = this._card.querySelector('.card__image');
    this._likeButton = this._card.querySelector('.card__btn-like');
    this._likeIndicator = this._card.querySelector('.card__like-indicator');
    this._deleteButton = this._card.querySelector('.card__btn-delete');
    this._hasUserLike = this._checkUserLike();
    this._cardTitle.textContent = this._titleText;
    this._likeIndicator.textContent = this._likesValue;
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = `Фото. ${this._titleText}`;

    if (!this._isUserOwner) {
      this._deleteButton.remove();
    }
    this._setEventListeners();
    this._updateLikeButtonView();

    return this._card;
  }

  updateCard(updatedCardData) {
    this._hasUserLike = !this._hasUserLike;
    this._likesList = updatedCardData.likes;
    this._likesValue = this._likesList.length;
    this._likeIndicator.textContent = this._likesValue;

    this._updateLikeButtonView();
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  getCardId() {
    return this._cardId;
  }
}
