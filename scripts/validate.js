function areInputsValid(inputList) {
  return inputList.every(inputElement => inputElement.validity.valid);
}

function clearFormErrors(formElement) {
  const inputArray = Array.from(formElement.querySelectorAll('.popup__form-input'));
  const errorArray = Array.from(formElement.querySelectorAll('.popup__form-error'));
  inputArray.forEach(input => {
    input.classList.remove('popup__form-input_type_error');
  })
  errorArray.forEach(error => {
    error.classList.remove('popup__form-error_active');
    error.textContent = '';
  })
}

function changeSubmitBtnState(inputList, submitBtn, props) {
  if (areInputsValid(inputList)) {
    submitBtn.classList.remove(props.inactiveButtonClass);
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.add(props.inactiveButtonClass);
    submitBtn.disabled = true;
  }
}

function showInputError(formElement, inputElement, errorMessage, props) {
  const inputError = formElement.querySelector(`.popup__form-error_data_${inputElement.id}`);
  inputError.textContent = errorMessage;
  inputError.classList.add(props.errorClass);
  inputElement.classList.add(props.inputErrorClass);
}

function hideInputError(formElement, inputElement, props) {
  const inputError = formElement.querySelector(`.popup__form-error_data_${inputElement.id}`);
  inputElement.classList.remove(props.inputErrorClass);
  inputError.classList.remove(props.errorClass);
  inputError.textContent = '';
}

function checkValidity(formElement, inputElement, props) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, props)
  } else {
    hideInputError(formElement, inputElement, props);
  }
}

function setEventListeners(formElement, props) {
  const submitBtn = formElement.querySelector(props.submitButtonSelector);
  const inputCollection = formElement.querySelectorAll(props.inputSelector);
  const inputArray = Array.from(inputCollection);
  changeSubmitBtnState(inputArray, submitBtn, props);
  inputArray.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, props);
      changeSubmitBtnState(inputArray, submitBtn, props);
    })
  })
  userEditBtn.addEventListener('click', () => {
    changeSubmitBtnState(inputArray, submitBtn, props);
  })
  userAddBtn.addEventListener('click', () => {
    changeSubmitBtnState(inputArray, submitBtn, props);
  })
}

function enableValidation(props) {
  const formCollection = document.querySelectorAll(props.formSelector);
  const formArray = Array.from(formCollection);
  formArray.forEach(formElement => {
    setEventListeners(formElement, props);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-error_active'
});
