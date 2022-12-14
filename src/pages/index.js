import './index.css';
import {validationConfig} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from '../components/FormValidator.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

// selectors
const gallerySelector = '.gallery__list';
const cardTemplateId = 'js-card-template';
const userDataPopupSelector = '.popup_action_edit';
const userAvatarPopupSelector = '.popup_action_edit-avatar';
const cardDataPopupSelector = '.popup_action_add';
const imageZoomPopupSelector = '.popup_action_zoom';
const confirmationPopupSelector = '.popup_action_confirm';
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

// api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'dada8704-016b-43db-b43a-5dfe373a30d9',
    'Content-Type': 'application/json'
  }
});
let userId = null;

// validators
const userFormValidator = new FormValidator(validationConfig, userDataForm);
const userAvatarFormValidator = new FormValidator(validationConfig, userAvatarForm);
const cardFormValidator = new FormValidator(validationConfig, cardDataForm);

userFormValidator.enableValidation();
userAvatarFormValidator.enableValidation();
cardFormValidator.enableValidation();

// init app components
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector, userAvatarSelector);
const userAvatarPopup = new PopupWithForm(userAvatarPopupSelector, submitUserAvatarData);
const userDataPopup = new PopupWithForm(userDataPopupSelector, submitUserData);
const cardDataPopup = new PopupWithForm(cardDataPopupSelector, submitCardData);
const imageZoomPopup = new PopupWithImage(imageZoomPopupSelector);
const confirmationPopup = new PopupWithConfirmation(confirmationPopupSelector, confirmDeleteHandler);
const gallery = new Section({
  renderer: renderCard
}, gallerySelector);

// set event listeners
userDataPopup.setEventListeners();
userAvatarPopup.setEventListeners();
cardDataPopup.setEventListeners();
imageZoomPopup.setEventListeners();
confirmationPopup.setEventListeners();

userEditBtn.addEventListener('click', () => {
  const {userName, userDescription} = userInfo.getUserInfo();
  userDataPopup.openPopup();
  userNameInput.value = userName;
  userDescriptionInput.value = userDescription;
  userFormValidator.clearFormStyles();
});

userEditAvatarBtn.addEventListener('click', () => {
  userAvatarPopup.openPopup();
  userAvatarFormValidator.clearFormStyles();
})

cardAddBtn.addEventListener('click', () => {
  cardDataPopup.openPopup();
  cardFormValidator.clearFormStyles();
});

// callback functions
function cardClickHandler(imageLink, titleText) {
  imageZoomPopup.openPopup(imageLink, titleText);
}

function likeClickHandler(card) {
  const cardId = card.getCardId();
  if (card.isLiked()) {
    api.unsetCardLike(cardId)
      .then(data => card.updateCard(data))
      .catch(console.error);
  } else {
    api.setCardLike(cardId)
      .then(data => card.updateCard(data))
      .catch(console.error);
  }
}

function deleteClickHanker(data) {
  confirmationPopup.openPopup(data);
}

function confirmDeleteHandler(card) {
  const cardId = card.getCardId();
  confirmationPopup.renderLoading(true);
  return api.deleteCard(cardId)
    .then(() => {
      card.removeCard();
      confirmationPopup.closePopup();
    })
    .catch(console.error)
    .finally(() => {
      confirmationPopup.renderLoading(false);
    });
}

function createCard(cardData) {
  return new Card({
    cardData,
    userId,
    cardClickHandler,
    likeClickHandler,
    deleteClickHanker
  }, cardTemplateId).generateCard();
}

function renderCard(cardData) {
  const card = createCard(cardData);
  gallery.addItem(card);
}

function submitCardData({cardTitle, cardImageUrl}) {
  cardDataPopup.renderLoading(true);
  api.addNewCard({
    name: cardTitle,
    link: cardImageUrl
  })
    .then(cardData => {
      const card = createCard(cardData);
      gallery.addItem(card);
      cardDataPopup.closePopup();
    })
    .catch(console.error)
    .finally(() => {
      cardDataPopup.renderLoading(false);
    })
}

function submitUserData({userName, userDescription}) {
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
      userDataPopup.closePopup();
    })
    .catch(console.error)
    .finally(() => {
      userDataPopup.renderLoading(false);
    });
}

function submitUserAvatarData({userAvatar}) {
  userAvatarPopup.renderLoading(true);
  api.updateUserAvatar({
    avatar: userAvatar
  })
    .then((user) => {
      userInfo.setUserInfo({
        userAvatar: user.avatar
      })
      userAvatarPopup.closePopup();
    })
    .catch(console.error)
    .finally(() => {
      userAvatarPopup.renderLoading(false);
    });
}

api.initializeAppData()
  .then(([userData, cardsList]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      userName: userData.name,
      userDescription: userData.about,
      userAvatar: userData.avatar
    });
    gallery.clear();
    gallery.renderItems(cardsList.reverse());
  })
  .catch(console.error);
