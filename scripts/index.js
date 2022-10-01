// page
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__description');
const userEditBtn = document.querySelector('.profile__btn-edit');
const userAddBtn = document.querySelector('.profile__btn-add');
const gallery = document.querySelector('.gallery__list');

// popup edit
const popupEdit = document.querySelector('.popup_action_edit');
const popupEditForm = document.querySelector('.popup__form_data_profile');
const editNameInput =  document.querySelector('.popup__form-text_type_name');
const editDescInput = document.querySelector('.popup__form-text_type_desc');

// popup add
const popupAdd = document.querySelector('.popup_action_add');
const popupAddForm = document.querySelector('.popup__form_data_card');
const cardTitleInput =  document.querySelector('.popup__form-text_type_card-title');
const cardImageInput = document.querySelector('.popup__form-text_type_card-image');

// popup zoom
const popupZoom = document.querySelector('.popup_action_zoom');
const popupZoomImage = document.querySelector('.popup__image');
const popupZoomText = document.querySelector('.popup__image-subtitle');

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
  userName.textContent = editNameInput.value;
  userDesc.textContent = editDescInput.value;
  closePopup(popupEdit);
}
function submitCardData(event) {
  event.preventDefault();
  let data = {};
  data.name = cardTitleInput.value;
  data.link = cardImageInput.value;
  addCard(data);
  cardTitleInput.value = '';
  cardImageInput.value = '';
  closePopup(popupAdd);
}
function addCard(data) {
  const cardTemplate = document.querySelector('#js-card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  renderCard(card,data);
  gallery.prepend(card);
}
function renderCard(card, data) {
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardLikeBtn = card.querySelector('.card__btn-like');
  const cardDeleteBtn = card.querySelector('.card__btn-delete');
  if (!data.name) cardTitle.textContent = '...';
  else cardTitle.textContent = data.name;
  if (!data.link) cardImage.src = './images/mock-image.jpg';
  else cardImage.src = data.link;
  cardLikeBtn.addEventListener('click', evt => {
    evt.target.classList.toggle('card__btn-like_active');
  });
  cardDeleteBtn.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });
  cardImage.addEventListener('click', () => {
    popupZoomImage.src = cardImage.src;
    popupZoomText.textContent = cardTitle.textContent;
    openPopup(popupZoom);
  });
}

// add listeners to buttons
exitButtonArray.forEach(item => {
  item.addEventListener('click', evt => {
    closePopup(evt.target.closest('.popup'));
  });
})
userAddBtn.addEventListener('click', () => openPopup(popupAdd));
userEditBtn.addEventListener('click', () => {
  editNameInput.value = userName.textContent;
  editDescInput.value = userDesc.textContent;
  openPopup(popupEdit);
});
popupAddForm.addEventListener('submit', submitCardData);
popupEditForm.addEventListener('submit', submitUserData);

// fill gallery
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];
initialCards.forEach(item => addCard(item));
