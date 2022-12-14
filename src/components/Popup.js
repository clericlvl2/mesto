export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._exitPopupKeyHandler = this._exitPopupKeyHandler.bind(this);
  }

  _exitPopupKeyHandler(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _exitPopupClickHandler(evt) {
    const isOverlay = evt.target === evt.currentTarget;
    const isExitBtn = evt.target.classList.contains('popup__btn-exit');
    if (isOverlay || isExitBtn) {
      this.closePopup();
    }
  }

  openPopup() {
    document.addEventListener('keydown', this._exitPopupKeyHandler);
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    document.removeEventListener('keydown', this._exitPopupKeyHandler);
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._exitPopupClickHandler.bind(this));
  }
}
