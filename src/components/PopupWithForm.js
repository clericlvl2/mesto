import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormData = submitFormCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__btn-submit');
    this._submitButtonText = this._submitButton.textContent;
    this._formData = {};
    this._inputList = Array.from(this._form.querySelectorAll('.popup__form-input'));
  }

  _getInputValues() {
    this._inputList.forEach(inputElement => {
      this._formData[inputElement.name] = inputElement.value;
    })
    return this._formData;
  }

  openPopup() {
    this._form.reset();
    super.openPopup();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      setTimeout(() => {
        this._submitButton.textContent = this._submitButtonText;
      }, 240)  // .24s waiting for popup opacity transition, decorative purpose
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._submitFormData(formData);
    });
  }
}
