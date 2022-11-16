import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { validationConfig, galleryMockData } from './constants.js';
import Section from "./Section.js";

// selectors
const cardListSelector = '.gallery__list';
const cardTemplateId = 'js-card-template';

// page
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const userEditBtn = document.querySelector('.profile__btn-edit');
const cardAddBtn = document.querySelector('.profile__btn-add');

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
const zoomedImage = imageZoomPopup.querySelector('.popup__image');
const zoomedText = imageZoomPopup.querySelector('.popup__image-subtitle');

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

function cardClickHandler(imageLink, titleText) {
  zoomedImage.src = imageLink;
  zoomedImage.alt = `Фото. ${titleText}`;
  zoomedText.textContent = titleText;
  openPopup(imageZoomPopup);
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

function createCard(data) {
  return new Card(data, cardTemplateId, cardClickHandler).generateCard();
}

const cardList = new Section({
  items: galleryMockData,
  renderer: cardData => {
    const card = createCard(cardData);
    cardList.addItem(card);
  }
}, cardListSelector)

function submitCardData(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };
  const card = createCard(cardData);
  cardList.addItem(card);
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

cardList.render();
