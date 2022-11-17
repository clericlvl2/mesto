import { validationConfig, galleryMockData } from './constants.js';
import Card from './Card.js';
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import FormValidator from './FormValidator.js';
import UserInfo from "./UserInfo.js";

// selectors
const cardListSelector = '.gallery__list';
const cardTemplateId = 'js-card-template';
const userDataPopupSelector = '.popup_action_edit';
const cardDataPopupSelector = '.popup_action_add';
const imageZoomPopupSelector = '.popup_action_zoom';
const userNameSelector = '.profile__name';
const userDescriptionSelector = '.profile__description';

// buttons
const userEditBtn = document.querySelector('.profile__btn-edit');
const cardAddBtn = document.querySelector('.profile__btn-add');

// popup user data
const userDataPopupElement = document.querySelector('.popup_action_edit');
const userDataForm = userDataPopupElement.querySelector('.popup__form_data_profile');
const userNameInput = userDataPopupElement.querySelector('.popup__form-input_data_name');
const userDescriptionInput = userDataPopupElement.querySelector('.popup__form-input_data_desc');

// popup card data
const cardDataPopupElement = document.querySelector('.popup_action_add');
const cardDataForm = cardDataPopupElement.querySelector('.popup__form_data_card');
const cardTitleInput = cardDataPopupElement.querySelector('.popup__form-input_data_card-title');
const cardImageInput = cardDataPopupElement.querySelector('.popup__form-input_data_card-image');

// enable validation
const userFormValidator = new FormValidator(validationConfig, userDataForm);
const cardFormValidator = new FormValidator(validationConfig, cardDataForm);

userFormValidator.enableValidation();
cardFormValidator.enableValidation();

// init app components
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector);
const userDataPopup = new PopupWithForm(userDataPopupSelector, submitUserData);
const cardDataPopup = new PopupWithForm(cardDataPopupSelector, submitCardData);
const imageZoomPopup = new PopupWithImage(imageZoomPopupSelector);
const cardList = new Section({
  items: galleryMockData,
  renderer: cardData => {
    const card = createCard(cardData);
    cardList.addItem(card);
  }
}, cardListSelector);

// set event listeners
userDataPopup.setEventListeners();
cardDataPopup.setEventListeners();
imageZoomPopup.setEventListeners();

userEditBtn.addEventListener('click', () => {
  const { userName, userDescription } = userInfo.getUserInfo();
  userDataPopup.openPopup();
  userNameInput.value = userName;
  userDescriptionInput.value = userDescription;
  userFormValidator.clearFormStyles();
});

cardAddBtn.addEventListener('click', () => {
  cardDataPopup.openPopup();
  cardFormValidator.clearFormStyles();
});

// callback functions
function createCard(data) {
  return new Card(data, cardTemplateId, cardClickHandler).generateCard();
}

function cardClickHandler(imageLink, titleText) {
  imageZoomPopup.openPopup(imageLink, titleText);
}

function submitCardData(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };
  const card = createCard(cardData);
  cardList.addItem(card);
  cardDataPopup.closePopup();
}

function submitUserData(evt) {
  evt.preventDefault();
  userInfo.setUserInfo({
    userName: userNameInput.value,
    userDescription: userDescriptionInput.value,
  })
  userDataPopup.closePopup();
}

cardList.render();
