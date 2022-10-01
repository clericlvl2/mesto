// page
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__description');
const userEditBtn = document.querySelector('.profile__btn-edit');
const userAddBtn = document.querySelector('.profile__btn-add');
const gallery = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#js-card-template').content;

// popup edit
const popupEditProfile = document.querySelector('.popup_action_edit');
const formEditProfile = document.querySelector('.popup__form_data_profile');
const userNameInput =  document.querySelector('.popup__form-text_type_name');
const userProfessionInput = document.querySelector('.popup__form-text_type_desc');

// popup add
const popupAddCard = document.querySelector('.popup_action_add');
const formAddCard = document.querySelector('.popup__form_data_card');
const cardTitleInput =  document.querySelector('.popup__form-text_type_card-title');
const cardImageInput = document.querySelector('.popup__form-text_type_card-image');

// popup zoom
const popupZoom = document.querySelector('.popup_action_zoom');
const zoomedImage = document.querySelector('.popup__image');
const zoomedText = document.querySelector('.popup__image-subtitle');

// btn array
const popupExitButtons = document.querySelectorAll('.popup__btn-exit');
const exitButtonArray = Array.from(popupExitButtons);

// app logic functions
function openPopup(element) {
  element.classList.add('popup_opened');
}
function closePopup(element) {
  element.classList.remove('popup_opened');
}
function submitUserData(event) {
  event.preventDefault();
  userName.textContent = userNameInput.value;
  userDesc.textContent = userProfessionInput.value;
  closePopup(popupEditProfile);
}
function submitCardData(event) {
  event.preventDefault();
  const data = {};
  data.name = cardTitleInput.value;
  data.link = cardImageInput.value;
  addCard(data);
  closePopup(popupAddCard);
  formAddCard.reset();
}
function addCard(data) {
  const newCard = createCard(data);
  gallery.prepend(newCard);
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
  cardLikeBtn.addEventListener('click', evt => {
    evt.target.classList.toggle('card__btn-like_active');
  });
  cardDeleteBtn.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });
  cardImage.addEventListener('click', () => {
    zoomedImage.src = cardImage.src;
    zoomedImage.alt = cardImage.alt;
    zoomedText.textContent = cardTitle.textContent;
    openPopup(popupZoom);
  });
  return card;
}

// add listeners to buttons
exitButtonArray.forEach(item => {
  item.addEventListener('click', evt => {
    closePopup(evt.target.closest('.popup'));
  });
})
userAddBtn.addEventListener('click', () => openPopup(popupAddCard));
userEditBtn.addEventListener('click', () => {
  userNameInput.value = userName.textContent;
  userProfessionInput.value = userDesc.textContent;
  openPopup(popupEditProfile);
});
formAddCard.addEventListener('submit', submitCardData);
formEditProfile.addEventListener('submit', submitUserData);
