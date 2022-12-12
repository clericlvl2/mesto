import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmClickHandler) {
    super(popupSelector);
    this._data = null;
    this._confirmClickHandler = confirmClickHandler;
    this._confirmButton = this._popup.querySelector('.popup__btn-submit');
    this._confirmButtonText = this._confirmButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => this._confirmClickHandler(this._data))
  }

  openPopup(data) {
    super.openPopup();
    this._data = data;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmButton.textContent = 'Выполнение...';
    } else {
      setTimeout(() => {
        this._confirmButton.textContent = this._confirmButtonText;
      }, 240)  // .24s waiting for popup opacity transition, decorative purpose
    }
  }
}
