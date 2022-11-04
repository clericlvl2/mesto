export default class FormValidator {
  constructor(props, element) {
    this._inputSelector = props.inputSelector;
    this._errorSelector = props.errorSelector;
    this._submitButtonSelector = props.submitButtonSelector;
    this._inactiveButtonClass = props.inactiveButtonClass;
    this._inputErrorClass = props.inputErrorClass;
    this._activeErrorClass = props.activeErrorClass;
    this._element = element;
  }

  _areInputsValid(inputList) {
    return inputList.every(inputElement => inputElement.validity.valid);
  }

  _showInputError(inputElement, errorMessage) {
    const inputError = this._element.querySelector(`.popup__form-error_data_${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    inputError.classList.add(this._activeErrorClass);
    inputError.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const inputError = this._element.querySelector(`.popup__form-error_data_${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._activeErrorClass);
    inputError.textContent = '';
  }

  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement);
    }
  }

  _checkSubmitBtnState(inputList) {
    const submitBtn = this._element.querySelector(this._submitButtonSelector);
    if (this._areInputsValid(inputList)) {
      submitBtn.classList.remove(this._inactiveButtonClass);
      submitBtn.disabled = false;
    } else {
      submitBtn.classList.add(this._inactiveButtonClass);
      submitBtn.disabled = true;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    this._checkSubmitBtnState(inputList);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement);
        this._checkSubmitBtnState(inputList);
      });
    });
  }

  clearFormStyles() {
    const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    const errorArray = Array.from(this._element.querySelectorAll(this._errorSelector));
    this._checkSubmitBtnState(inputList);

    inputList.forEach(input => {
      input.classList.remove(this._inputErrorClass);
    });
    errorArray.forEach(error => {
      error.classList.remove(this._activeErrorClass);
      error.textContent = '';
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
