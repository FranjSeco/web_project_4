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


// FUNCTIONS
function cardMaker(card) {
  const cardElement = cardTemplate.querySelector(".element");
  const cloneCard = cardElement.cloneNode(true);

  const cardDeleteButton = cloneCard.querySelector('.element__trash');
  const cardImage = cloneCard.querySelector(".element__image");
  const cardName = cloneCard.querySelector(".element__title");
  const cardLike = cloneCard.querySelector(".element__like-btn");

  cardDeleteButton.addEventListener("click", function (event) {
    event.target.closest(".element").remove(cloneCard);
  });

  cardLike.addEventListener("click", function (event) {
    event.target.classList.toggle("element__like-black")
  });

  return cloneCard;
}

function overlayOn() {
  overlay.classList.add("overlay_popup");
}

function overlayOff() {
  overlay.classList.remove("overlay_popup");
}

function imageOn() {
  imagePopupModal.classList.add("image-popup_on");
}

function imageOff() {
  imagePopupModal.classList.remove("image-popup_on");
}

function editFormOn() {
  profileFormModal.classList.add("edit-form_on");
}
function editFormOff() {
  profileFormModal.classList.remove("edit-form_on");
}

function imageFormOn() {
  imageFormModal.classList.add("image-form_on");
}
function imageFormOff() {
  imageFormModal.classList.remove("image-form_on");
}

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

initialCards.forEach(card => {
  const cardItems = cardMaker(card);
  cardWrapper.append(cardItems);
  cardItems.querySelector(".element__image").src = card.link;
  cardItems.querySelector(".element__image").alt = `Picture of ${card.name}`;
  cardItems.querySelector(".element__title").textContent = card.name;

});

// CLOSE ICON
overlay.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-icon")) {
    overlayOff();
    imageOff();
    editFormOff();
    imageFormOff();
  }
});

// PROFILE: NAME AND PROFESSION
profileEdit.addEventListener("click", function () {
  overlayOn();
  editFormOn();
  formProfileName.value = nameText.textContent;
  formProfileAbout.value = aboutText.textContent;
});


formProfileSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameText.textContent = formProfileName.value;
  aboutText.textContent = formProfileAbout.value;
  overlayOff();
  editFormOff();
});

profileFormModal.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-icon")) {
    overlayOff();
    editFormOff();
  }
});

// ADDING CARD
addPlace.addEventListener("click", function () {
  overlayOn();
  imageFormOn();
  formImageName.value = "";
  formImageLink.value = "";
});

formImageSubmit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  overlayOff();
  imageFormOff();
  const newCard = cardMaker();
  cardWrapper.prepend(newCard);
  evt.stopImmediatePropagation();
  newCard.querySelector(".element__image").src = formImageLink.value;
  newCard.querySelector(".element__image").alt = `Picture of ${formImageName.value}`;
  newCard.querySelector(".element__title").textContent = formImageName.value;
});

imageFormModal.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-icon")) {
    overlayOff();
    imageFormOff();
  }
});


// PICTURE POPUP
cardWrapper.addEventListener("click", function (event) {
  if (event.target.classList.contains("element__image")) {
    overlayOn();
    imageOn();

    imagePic.src = event.target.src;
    imagePic.alt = event.target.alt;
    imageFig.textContent = event.target.alt;
  }
});

imagePopupModal.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-icon")) {
    overlayOff();
    imageOff();
  }
});





