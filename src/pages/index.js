import './index.css';
import { validationConfig, galleryMockData } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from '../components/FormValidator.js';
import UserInfo from "../components/UserInfo.js";

// selectors
const cardListSelector = '.gallery__list';
const cardTemplateId = 'js-card-template';
const userDataPopupSelector = '.popup_action_edit';
const cardDataPopupSelector = '.popup_action_add';
const imageZoomPopupSelector = '.popup_action_zoom';
const userNameSelector = '.profile__name';
const userDescriptionSelector = '.profile__description';

// dom elements
const userEditBtn = document.querySelector('.profile__btn-edit');
const cardAddBtn = document.querySelector('.profile__btn-add');
const userDataForm = document.querySelector('.popup__form_data_profile');
const cardDataForm = document.querySelector('.popup__form_data_card');
const userNameInput = document.querySelector('.popup__form-input_data_name');
const userDescriptionInput = document.querySelector('.popup__form-input_data_desc');

// validators
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

function submitCardData({ cardTitle, cardImageUrl }) {
  const card = createCard({
    name: cardTitle,
    link: cardImageUrl,
  });
  cardList.addItem(card);
  cardDataPopup.closePopup();
}

function submitUserData({ userName, userDescription }) {
  userInfo.setUserInfo({ userName, userDescription })
  userDataPopup.closePopup();
}

cardList.render();
