import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__image');
    this._subtitleElement = this._popup.querySelector('.popup__image-subtitle');
  }

  openPopup(imageLink, imageTitle) {
    this._imageElement.src = imageLink;
    this._imageElement.alt = `Фото. ${imageTitle}`;
    this._subtitleElement.textContent = imageTitle;
    super.openPopup();
  }
}
