let favButtonArray = document.querySelectorAll('.card__btn');
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
for (let item of favButtonArray) {
  let changeBack = setState(item);
  item.addEventListener('click', changeBack)
}
let userName = document.querySelector('.profile__name');
let userDesc = document.querySelector('.profile__description');
function showPopup () {
  let body = document.querySelector('.root');
  body.insertAdjacentHTML('afterbegin', `
    <div class="popup">
      <div class="popup__container">
        <h3 class="popup__title">Редактировать профиль</h3>
        <div class="popup__form">
          <input type="text" class="popup__form-text popup__form-text_type_name" maxlength="12">
          <input type="text" class="popup__form-text popup__form-text_type_desc" maxlength="28">
          <button class="popup__btn popup__btn_action_save">
            <p class="popup__btn-text">Сохранить</p>
          </button>
        </div>
        <button class="popup__btn popup__btn_action_exit"></button>
      </div>
    </div>
  `);
  renderPopup();
}
function renderPopup() {
  let nameInput =  document.querySelector('.popup__form-text_type_name');
  let descInput = document.querySelector('.popup__form-text_type_desc');
  let exitButton = document.querySelector('.popup__btn_action_exit');
  let saveButton = document.querySelector('.popup__btn_action_save');
  nameInput.value = userName.innerText;
  descInput.value = userDesc.innerText;
  saveButton.addEventListener('click', () => {
    userName.innerText = nameInput.value;
    userDesc.innerText = descInput.value;
    closePopup()
  })
  exitButton.addEventListener('click', closePopup);
}
function closePopup() {
  document.querySelector('.popup').remove();
}
let editButton = document.querySelector('.profile__btn_action_edit');
editButton.addEventListener('click', showPopup);
