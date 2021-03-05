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
const overlay = document.querySelector(".overlay");
const popups = document.querySelectorAll('.overlay');
const imageOverlay = document.querySelector("#imageOverlay");
const profileFormOverlay = document.querySelector("#profileFormOverlay");
const imageFormOverlay = document.querySelector("#imageFormOverlay");

const editBtn = document.querySelector(".profile__info-btn");
const addBtn = document.querySelector(".profile__add-btn");
const nameText = document.querySelector(".profile__info-title");
const aboutText = document.querySelector(".profile__info-about");

const formImageName = imageFormOverlay.querySelector(".image-form__input_name");
const formImageLink = imageFormOverlay.querySelector(".image-form__input_about");

const formProfileName = profileFormOverlay.querySelector(".edit-form__input_name");
const formProfileAbout = profileFormOverlay.querySelector(".edit-form__input_about");
const formProfileBtn = profileFormOverlay.querySelector(".edit-form__btn")

const imagePic = imageOverlay.querySelector(".image-popup__picture");
const imageFig = imageOverlay.querySelector(".image-popup__caption");

const addPlace = document.querySelector(".profile__add-btn");
const profileEdit = document.querySelector(".profile__info-btn");
const formImageSubmit = imageFormOverlay.querySelector(".image-form__form");
const formProfileSubmit = profileFormOverlay.querySelector(".edit-form__form");

const closeImage = imageOverlay.querySelector(".close-icon");
const closeProfileForm = profileFormOverlay.querySelector(".close-icon");
const closeImageForm = imageFormOverlay.querySelector(".close-icon");

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
    toggleModalWindow(imageOverlay);
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

// ADDING CARD
addPlace.addEventListener("click", function () {
  toggleModalWindow(imageFormOverlay);
  formImageName.value = "";
  formImageLink.value = "";
});

formImageSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  toggleModalWindow(imageFormOverlay);
  const newCard = cardMaker({
    name: formImageName.value,
    link: formImageLink.value
  });
  cardWrapper.prepend(newCard);

});

// INITIAL CARDS
initialCards.forEach(card => {
  const cardItems = cardMaker(card);
  cardWrapper.append(cardItems);
});
