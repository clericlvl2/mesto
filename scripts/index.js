let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__description');
let profileEditBtn = document.querySelector('.profile__btn-edit');
let popupWindow = document.querySelector('.popup');
let popupInputName =  document.querySelector('.popup__form-text_type_name');
let popupInputDesc = document.querySelector('.popup__form-text_type_desc');
let popupExitBtn = document.querySelector('.popup__btn-exit');
let popupSaveBtn = document.querySelector('.popup__btn-save');
let likeButtons = document.querySelectorAll('.card__btn');
let likeButtonsArray = Array.from(likeButtons);
function openPopup() {
  popupWindow.classList.add('popup_opened');
  popupInputName.value = profileName.textContent;
  popupInputDesc.value = profileDesc.textContent;
}
function closePopup() {
  popupWindow.classList.remove('popup_opened');
}
function submitData(event) {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDesc.textContent = popupInputDesc.value;
  closePopup();
}
profileEditBtn.addEventListener('click', openPopup);
popupExitBtn.addEventListener('click', closePopup);
popupSaveBtn.addEventListener('click', submitData)
function setState(item) {
  let isActive = false;
  return function () {
    if (!isActive){
      item.style.backgroundImage = `url('./images/fav-icon-black.svg')`;
    }
    else {
      item.style.backgroundImage = `url('./images/fav-icon.svg')`;
    }
    isActive = !isActive;
  }
}
for (let item of likeButtonsArray) {
  let changeBack = setState(item);
  item.addEventListener('click', changeBack)
}
