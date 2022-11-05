export default class Card {
  constructor(data, templateSelector, cardClickHandler) {
    this._templateSelector = templateSelector;
    this._cardClickHandler = cardClickHandler;
    this._card = null;
    this._cardTitle = null;
    this._cardImage = null;
    this._likeButton = null;
    this._deleteButton = null;
    this._titleText = data.name;
    this._imageLink = data.link;
  }

  _getCardTemplate() {
    return document
      .getElementById(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _handleLikeBtn(evt) {
    evt.target.classList.toggle('card__btn-like_active');
  }

  _handleDeleteBtn(evt) {
    evt.target.closest('.card').remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', evt => {
      this._handleLikeBtn(evt);
    });
    this._deleteButton.addEventListener('click', evt => {
      this._handleDeleteBtn(evt);
    });
    this._cardImage.addEventListener('click', () => {
      this._cardClickHandler(this._imageLink, this._titleText);
    });
  }

  generateCard() {
    this._card = this._getCardTemplate();
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardImage = this._card.querySelector('.card__image');
    this._likeButton = this._card.querySelector('.card__btn-like');
    this._deleteButton = this._card.querySelector('.card__btn-delete');

    this._setEventListeners();
    this._cardTitle.textContent = this._titleText;
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = `Фото. ${this._titleText}`;

    return this._card;
  }
}
