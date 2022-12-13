export default class FormValidator {
  constructor(props, formElement) {
    this._inputSelector = props.inputSelector;
    this._errorSelector = props.errorSelector;
    this._submitButtonSelector = props.submitButtonSelector;
    this._inactiveButtonClass = props.inactiveButtonClass;
    this._inputErrorClass = props.inputErrorClass;
    this._activeErrorClass = props.activeErrorClass;
    this._form = formElement;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._errorList = Array.from(this._form.querySelectorAll(this._errorSelector));
  }

  _areInputsValid() {
    return this._inputList.every(inputElement => inputElement.validity.valid);
  }

  _showInputError(inputElement, errorMessage) {
    const inputError = this._form.querySelector(`.popup__form-error_data_${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    inputError.classList.add(this._activeErrorClass);
    inputError.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const inputError = this._form.querySelector(`.popup__form-error_data_${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._activeErrorClass);
    inputError.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement);
    }
  }

  _checkSubmitBtnState() {
    if (this._areInputsValid()) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  _setEventListeners() {
    this._checkSubmitBtnState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._checkSubmitBtnState();
      });
    });
  }

  clearFormStyles() {
    this._inputList.forEach(input => this._hideInputError(input));
    this._checkSubmitBtnState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
