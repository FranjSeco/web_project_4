// const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
//   },
//   {
//     name: "Lake Louise",
//     link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
//   },
//   {
//     name: "Latemar",
//     link: "https://code.s3.yandex.net/web-code/latemar.jpg"
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://code.s3.yandex.net/web-code/lago.jpg"
//   }
// ];

const cardWrapper = document.querySelector(".elements");

// const profileFormOverlay = document.querySelector("#profileFormOverlay");
const imageFormOverlay = document.querySelector("#imageFormOverlay");

const formImageName = imageFormOverlay.querySelector(".image-form__input_name");
const formImageLink = imageFormOverlay.querySelector(".image-form__input_about");

const currentName = document.querySelector(".edit-form__input_name");
const currentJob = document.querySelector(".edit-form__input_about");
// const name = document.querySelector(".profile__info-title");
// const about = document.querySelector(".profile__info-about");

const addPlace = document.querySelector(".profile__add-btn");
const profileEdit = document.querySelector(".profile__info-btn");

const avatarEdit = document.querySelector(".profile__avatar");
const formImageSubmit = imageFormOverlay.querySelector(".image-form__form");
const formProfileSubmit = profileFormOverlay.querySelector(".edit-form__form");

const avatarBtn = document.querySelector(".avatar-form__btn");
const profileBtn = document.querySelector(".edit-form__btn");
const imageBtn = document.querySelector(".image-form__btn");

const cardElementSelector = ".elements";

const settings = {
  formSelector: ".form",
  inputSelector: ".form-input",
  submitButtonSelector: ".form-submit",
  spanElement: ".form-input-error",
  inactiveButtonClass: "form-submit_inactive",
  inputErrorClass: "form-input_type_error",
  errorClass: "form-input-error_active"
};


export { avatarBtn, imageBtn, profileBtn, avatarEdit, imageFormOverlay, currentName, currentJob, cardElementSelector, cardWrapper, formImageName, formImageLink, addPlace, profileEdit,
formImageSubmit, formProfileSubmit, settings};
