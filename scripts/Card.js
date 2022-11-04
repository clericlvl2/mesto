class Card {
  constructor(data, templateSelector) {
    this._image = data.link;
    this._title = data.name;
    this._templateSelector = templateSelector;
    this._element = null;
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

  _handleImageClick() {
    zoomedImage.src = this._image;
    zoomedImage.alt = `Фото. ${this._title}`;
    zoomedText.textContent = this._title;
    openPopup(popupZoomImage);
  }

  _setEventListeners() {
    const cardLikeBtn = this._element.querySelector('.card__btn-like');
    const cardDeleteBtn = this._element.querySelector('.card__btn-delete');
    const cardImage = this._element.querySelector('.card__image');
    cardLikeBtn.addEventListener('click', evt => {
      this._handleLikeBtn(evt);
    });
    cardDeleteBtn.addEventListener('click', evt => {
      this._handleDeleteBtn(evt);
    });
    cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._element = this._getCardTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = `Фото. ${this._title}`;

    return this._element;
  }
}
