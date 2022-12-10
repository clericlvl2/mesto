import './index.css';
import { validationConfig, galleryMockData } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from '../components/FormValidator.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

// selectors
const cardListSelector = '.gallery__list';
const cardTemplateId = 'js-card-template';
const userDataPopupSelector = '.popup_action_edit';
const userAvatarPopupSelector = '.popup_action_edit-avatar';
const cardDataPopupSelector = '.popup_action_add';
const imageZoomPopupSelector = '.popup_action_zoom';
const userNameSelector = '.profile__name';
const userDescriptionSelector = '.profile__description';
const userAvatarSelector = '.profile__image';

// dom elements
const userEditBtn = document.querySelector('.profile__btn-edit');
const userEditAvatarBtn = document.querySelector('.profile__btn-edit-image');
const cardAddBtn = document.querySelector('.profile__btn-add');
const userDataForm = document.querySelector('.popup__form_data_profile');
const userAvatarForm = document.querySelector('.popup__form_data_user-avatar')
const cardDataForm = document.querySelector('.popup__form_data_card');
const userNameInput = document.querySelector('.popup__form-input_data_name');
const userDescriptionInput = document.querySelector('.popup__form-input_data_desc');
const userAvatarInput = document.querySelector('.popup__form-input_data_user-avatar');

// validators
const userFormValidator = new FormValidator(validationConfig, userDataForm);
const userAvatarFormValidator = new FormValidator(validationConfig, userAvatarForm);
const cardFormValidator = new FormValidator(validationConfig, cardDataForm);

userFormValidator.enableValidation();
cardFormValidator.enableValidation();
userAvatarFormValidator.enableValidation();

// api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'dada8704-016b-43db-b43a-5dfe373a30d9',
    'Content-Type': 'application/json'
  }
});

// init app components
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector, userAvatarSelector);
const userAvatarPopup = new PopupWithForm(userAvatarPopupSelector, submitUserAvatarData);
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
userAvatarPopup.setEventListeners();
cardDataPopup.setEventListeners();
imageZoomPopup.setEventListeners();

userEditBtn.addEventListener('click', () => {
  const { userName, userDescription } = userInfo.getUserInfo();
  userDataPopup.openPopup();
  userNameInput.value = userName;
  userDescriptionInput.value = userDescription;
  userFormValidator.clearFormStyles();
});

userEditAvatarBtn.addEventListener('click', () => {
  const { userAvatar } = userInfo.getUserInfo();
  userAvatarPopup.openPopup();
  userAvatarInput.value = userAvatar;
  userAvatarFormValidator.clearFormStyles();
})

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
  userDataPopup.renderLoading(true);
  api.updateUserInfo({
    name: userName,
    about: userDescription
  })
    .then(user => {
      userInfo.setUserInfo({
        userName: user.name,
        userDescription: user.about
      });
    })
    .finally(() => {
      userDataPopup.closePopup();
      userDataPopup.renderLoading(false);
    });
}

function submitUserAvatarData({ userAvatar }) {
  userAvatarPopup.renderLoading(true);
  api.updateUserAvatar({
    avatar: userAvatar
  })
    .then((user) => {
      userInfo.setUserInfo({
        userAvatar: user.avatar
      })
    })
    .finally(() => {
      userAvatarPopup.closePopup();
      userAvatarPopup.renderLoading(false);
    });
}

function renderUserData() {
  api.getUserData().then(user => {
    userInfo.setUserInfo({
      userName: user.name,
      userDescription: user.about,
      userAvatar: user.avatar
    });
  })
}


renderUserData();
cardList.render();
