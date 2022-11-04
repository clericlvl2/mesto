import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { validationConfig, galleryMockData } from './constants.js';

// page
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const userEditBtn = document.querySelector('.profile__btn-edit');
const cardAddBtn = document.querySelector('.profile__btn-add');
const gallery = document.querySelector('.gallery__list');

// popup user data
const userDataPopup = document.querySelector('.popup_action_edit');
const userDataForm = userDataPopup.querySelector('.popup__form_data_profile');
const userNameInput = userDataPopup.querySelector('.popup__form-input_data_name');
const userDescriptionInput = userDataPopup.querySelector('.popup__form-input_data_desc');

// popup card data
const cardDataPopup = document.querySelector('.popup_action_add');
const cardDataForm = cardDataPopup.querySelector('.popup__form_data_card');
const cardTitleInput = cardDataPopup.querySelector('.popup__form-input_data_card-title');
const cardImageInput = cardDataPopup.querySelector('.popup__form-input_data_card-image');

// popup zoom image
const imageZoomPopup = document.querySelector('.popup_action_zoom');

const popupList = [userDataPopup, cardDataPopup, imageZoomPopup];

// enable validation
const userFormValidator = new FormValidator(validationConfig, userDataForm);
const cardFormValidator = new FormValidator(validationConfig, cardDataForm);
userFormValidator.enableValidation();
cardFormValidator.enableValidation();

// app logic functions
function openPopup(popupElement) {
  document.addEventListener('keydown', exitPopupKeyHandler);
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  document.removeEventListener('keydown', exitPopupKeyHandler);
  popupElement.classList.remove('popup_opened');
}

function exitPopupKeyHandler(evt) {
  if (evt.key === 'Escape' && document.querySelector('.popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function exitPopupClickHandler(evt) {
  const isOverlay = evt.target === evt.currentTarget;
  const isExitBtn = evt.target.classList.contains('popup__btn-exit');
  if (isOverlay) {
    closePopup(evt.currentTarget);
  }
  if (isExitBtn) {
    closePopup(evt.currentTarget);
  }
}

function addCard(data) {
  const newCard = new Card(data, 'js-card-template', openPopup).generateCard();
  gallery.prepend(newCard);
}

function submitCardData(evt) {
  evt.preventDefault();
  const data = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };
  addCard(data);
  closePopup(cardDataPopup);
}

function submitUserData(event) {
  event.preventDefault();
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;
  closePopup(userDataPopup);
}

// set popups, forms and buttons event listeners
userDataForm.addEventListener('submit', submitUserData);
cardDataForm.addEventListener('submit', submitCardData);
userEditBtn.addEventListener('click', () => {
  userNameInput.value = userName.textContent;
  userDescriptionInput.value = userDescription.textContent;
  userFormValidator.clearFormStyles();
  openPopup(userDataPopup);
});
cardAddBtn.addEventListener('click', () => {
  cardDataForm.reset();
  cardFormValidator.clearFormStyles();
  openPopup(cardDataPopup);
});
popupList.forEach(popupElement => {
  popupElement.addEventListener('click', exitPopupClickHandler);
});

galleryMockData.forEach(item => addCard(item));
