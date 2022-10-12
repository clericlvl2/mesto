// page
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__description');
const userEditBtn = document.querySelector('.profile__btn-edit');
const userAddBtn = document.querySelector('.profile__btn-add');
const gallery = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#js-card-template').content;

// popup edit profile
const popupEditProfile = document.querySelector('.popup_action_edit');
const formEditProfile = document.querySelector('.popup__form_data_profile');
const userNameInput = document.querySelector('.popup__form-input_data_name');
const userProfessionInput = document.querySelector('.popup__form-input_data_desc');
const submitProfileDataBtn = document.querySelector('.popup__btn-submit_data_profile');

// popup add card
const popupAddCard = document.querySelector('.popup_action_add');
const formAddCard = document.querySelector('.popup__form_data_card');
const cardTitleInput = document.querySelector('.popup__form-input_data_card-title');
const cardImageInput = document.querySelector('.popup__form-input_data_card-image');

// popup zoom image
const popupZoomImage = document.querySelector('.popup_action_zoom');
const zoomedImage = document.querySelector('.popup__image');
const zoomedText = document.querySelector('.popup__image-subtitle');

const popupArray = [popupEditProfile, popupAddCard, popupZoomImage];

// app logic functions
function openPopup(popupElement) {
  document.addEventListener('keydown', exitPopupKeyHandler);
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  document.removeEventListener('keydown', exitPopupKeyHandler);
  popupElement.classList.remove('popup_opened');
}

function submitUserData(event) {
  event.preventDefault();
  userName.textContent = userNameInput.value;
  userDesc.textContent = userProfessionInput.value;
  closePopup(popupEditProfile);
}

function setCardListeners(image, title, likeBtn, deleteBtn) {
  likeBtn.addEventListener('click', evt => {
    evt.target.classList.toggle('card__btn-like_active');
  });
  deleteBtn.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });
  image.addEventListener('click', () => {
    zoomedImage.src = image.src;
    zoomedImage.alt = image.alt;
    zoomedText.textContent = title.textContent;
    openPopup(popupZoomImage);
  });
}

function createCard(data) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardLikeBtn = card.querySelector('.card__btn-like');
  const cardDeleteBtn = card.querySelector('.card__btn-delete');
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = 'Фото. ' + data.name;
  setCardListeners(cardImage, cardTitle, cardLikeBtn, cardDeleteBtn);
  return card;
}

function addCard(data) {
  const newCard = createCard(data);
  gallery.prepend(newCard);
}

function submitCardData(evt) {
  evt.preventDefault();
  const data = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };
  addCard(data);
  closePopup(popupAddCard);
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

function exitPopupKeyHandler(evt) {
  if (evt.key === 'Escape' && document.querySelector('.popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

popupArray.forEach(popup => {
  popup.addEventListener('click', exitPopupClickHandler);
})

userEditBtn.addEventListener('click', () => {
  clearFormErrors(formEditProfile, validationConfig);
  userNameInput.value = userName.textContent;
  userProfessionInput.value = userDesc.textContent;
  openPopup(popupEditProfile);
});
userAddBtn.addEventListener('click', () => {
  formAddCard.reset();
  clearFormErrors(formAddCard, validationConfig);
  openPopup(popupAddCard);
});
formEditProfile.addEventListener('submit', submitUserData);
formAddCard.addEventListener('submit', submitCardData);
