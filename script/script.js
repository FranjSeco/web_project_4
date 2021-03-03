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

const cardTemplate = document.querySelector("#el-template").content;
const cardWrapper = document.querySelector(".elements");
const overlay = document.querySelector("#overlay");
const closeIcon = overlay.querySelector(".close-icon");
const imagePopupModal = overlay.querySelector(".image-popup");
const imageFormModal = overlay.querySelector(".image-form");
const profileFormModal = overlay.querySelector(".edit-form");




const editBtn = document.querySelector(".profile__info-btn");
const addBtn = document.querySelector(".profile__add-btn");
const nameText = document.querySelector(".profile__info-title");
const aboutText = document.querySelector(".profile__info-about");

const formImageName = imageFormModal.querySelector(".image-form__input_name");
const formImageLink = imageFormModal.querySelector(".image-form__input_about");

const formProfileName = profileFormModal.querySelector(".edit-form__input_name");
const formProfileAbout = profileFormModal.querySelector(".edit-form__input_about");
const formProfileBtn = profileFormModal.querySelector(".edit-form__btn")

const imagePic = imagePopupModal.querySelector(".image-popup__picture");
const imageFig = imagePopupModal.querySelector(".image-popup__caption");

const addPlace = document.querySelector(".profile__add-btn");
const profileEdit = document.querySelector(".profile__info-btn");
const formImageSubmit = overlay.querySelector(".image-form__form");
const formProfileSubmit = overlay.querySelector(".edit-form__form");

const closeImage = imagePopupModal.querySelector(".close-icon");
const closeProfileForm = profileFormModal.querySelector(".close-icon");
const closeImageForm = imageFormModal.querySelector(".close-icon");

// FUNCTIONS
function cardMaker(card) {
  const cardElement = cardTemplate.querySelector(".element");
  const cloneCard = cardElement.cloneNode(true);
  const cardDeleteButton = cloneCard.querySelector('.element__trash');

  const cardImage = cloneCard.querySelector(".element__image");
  const cardName = cloneCard.querySelector(".element__title");
  const cardLike = cloneCard.querySelector(".element__like-btn");
  cardImage.src = card.link;
  cardImage.alt = `Picture of ${card.name}`;
  cardName.textContent = card.name;

  // LIKE BUTTON
  cardLike.addEventListener("click", function (event) {
    event.target.classList.toggle("element__like-black");
  });

  // PICTURE POPUP
  cardImage.addEventListener("click", function (event) {
    toggleModalWindow(imagePopupModal);
    imagePic.src = event.target.src;
    imagePic.alt = event.target.alt;
    imageFig.textContent = event.target.alt;
  });

  // DELETE BUTTON
  cardDeleteButton.addEventListener("click", function () {
    cloneCard.remove();
  });

  return cloneCard;
}

// OPEN/CLOSING POPUPS
function toggleModalWindow(modalWindow) {
  overlay.classList.toggle("overlay_popup");
  modalWindow.classList.toggle("popup_opened");

}

// CLOSE BY CLICKING OVERLAY
overlay.addEventListener("click", (evt) => {
  if (evt.target.id === "overlay" && imagePopupModal.classList.contains("popup_opened")) {
    toggleModalWindow(imagePopupModal);
  } else if (evt.target.id === "overlay" && imageFormModal.classList.contains("popup_opened")) {
    toggleModalWindow(imageFormModal);
  } else if (evt.target.id === "overlay" && profileFormModal.classList.contains("popup_opened")) {
    toggleModalWindow(profileFormModal);
  }
});

// CLOSE BY ESC
function escHandler(evt) {
  console.log(evt.key);
}

overlay.addEventListener("keydown", escHandler);


// PROFILE: NAME AND PROFESSION
profileEdit.addEventListener("click", function () {
  toggleModalWindow(profileFormModal);
  formProfileName.value = nameText.textContent;
  formProfileAbout.value = aboutText.textContent;
});

formProfileSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameText.textContent = formProfileName.value;
  aboutText.textContent = formProfileAbout.value;
  toggleModalWindow(profileFormModal);
});

// ADDING CARD
addPlace.addEventListener("click", function () {
  toggleModalWindow(imageFormModal);
  formImageName.value = "";
  formImageLink.value = "";
});

formImageSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  toggleModalWindow(imageFormModal);
  const newCard = cardMaker({
    name: formImageName.value,
    link: formImageLink.value
  });
  cardWrapper.prepend(newCard);

});

// CLOSE BUTTONS
closeImage.addEventListener("click", function () {
  toggleModalWindow(imagePopupModal);
});

closeProfileForm.addEventListener("click", function (event) {
  toggleModalWindow(profileFormModal);
});

closeImageForm.addEventListener("click", function (event) {
  toggleModalWindow(imageFormModal);
});



// INITIAL CARDS
initialCards.forEach(card => {
  const cardItems = cardMaker(card);
  cardWrapper.append(cardItems);
});




// VALIDATION


const formElement = document.querySelector(".form");

const formInput = formElement.querySelector(".form-input");


const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add("form-input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("form-input-error_active");
};

const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove("form-input_type_error");
  formError.classList.remove("form-input-error_active");
  formError.textContent = "";
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
});



const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form-input"));
  const buttonElement = formElement.querySelector(".form-submit");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form-submit_inactive");
  } else {
    buttonElement.classList.remove("form-submit_inactive");
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};



enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});
