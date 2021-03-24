import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

// CARD TEMPLATE
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//VARIABLES

const cardWrapper = document.querySelector(".elements");

const popups = document.querySelectorAll('.overlay');

const profileFormOverlay = document.querySelector("#profileFormOverlay");
const imageFormOverlay = document.querySelector("#imageFormOverlay");

const nameText = document.querySelector(".profile__info-title");
const aboutText = document.querySelector(".profile__info-about");

const formImageName = imageFormOverlay.querySelector(".image-form__input_name");
const formImageLink = imageFormOverlay.querySelector(".image-form__input_about");

const formProfileName = profileFormOverlay.querySelector(".edit-form__input_name");
const formProfileAbout = profileFormOverlay.querySelector(".edit-form__input_about");


const addPlace = document.querySelector(".profile__add-btn");
const profileEdit = document.querySelector(".profile__info-btn");
const formImageSubmit = imageFormOverlay.querySelector(".image-form__form");
const formProfileSubmit = profileFormOverlay.querySelector(".edit-form__form");

const settings = {
  formSelector: ".form",
  inputSelector: ".form-input",
  submitButtonSelector: ".form-submit",
  spanElement: ".form-input-error",
  inactiveButtonClass: "form-submit_inactive",
  inputErrorClass: "form-input_type_error",
  errorClass: "form-input-error_active"
};

const editFormValidator = new FormValidator(settings, document.querySelector(".edit-form"));
const addFormValidator = new FormValidator(settings, document.querySelector(".image-form"));

// INITIAL CARDS
initialCards.forEach((card)=> {
  const newCard = new Card(card, "#el-template");
  cardWrapper.append(newCard.getCard());
});

// ADDING CARD
addPlace.addEventListener("click", function () {
  toggleModalWindow(imageFormOverlay);
  formImageName.value = "";
  formImageLink.value = "";
});

const renderCard = (evt) => {
  evt.preventDefault();
  toggleModalWindow(imageFormOverlay);
  const cardData = imageFormOverlay.querySelector(".image-form__form");
  const newCard = new Card(cardData, "#el-template");
  cardWrapper.prepend(newCard.getCard());
}

formImageSubmit.addEventListener("submit", renderCard);

// OPEN/CLOSING POPUPS
function toggleModalWindow(modal) {
  modal.classList.toggle("overlay_popup");
  if (modal.classList.contains("overlay_popup")) {
    document.addEventListener('keydown', closeEsc);
  } else {
    document.removeEventListener('keydown', closeEsc);
  }
}

// CLOSE BY CLICKING OVERLAY OR CLOSE ICON
      popups.forEach((popup) => {
          popup.addEventListener('click', (evt) => {
              if (evt.target.classList.contains('overlay_popup')) {
                  toggleModalWindow(popup)
              } else if (evt.target.classList.contains('close-icon')) {
                toggleModalWindow(popup)
              }
          })
      });

// CLOSE BY ESC
function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.overlay_popup');
    toggleModalWindow(openedPopup);
  }
}

// PROFILE: NAME AND PROFESSION
profileEdit.addEventListener("click", function () {
  toggleModalWindow(profileFormOverlay);
  formProfileName.value = nameText.textContent;
  formProfileAbout.value = aboutText.textContent;
});

formProfileSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameText.textContent = formProfileName.value;
  aboutText.textContent = formProfileAbout.value;
  toggleModalWindow(profileFormOverlay);
});



// VALIDATION
editFormValidator.enableValidation();
addFormValidator.enableValidation();
