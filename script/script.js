//VARIABLES
const overlay = document.querySelector("#overlay");

const editBtn = document.querySelector(".profile__info-btn");
const addBtn = document.querySelector(".profile__add-btn");

const cards = document.querySelector("#el-template").content;
const element = cards.querySelector(".element");
const elementSection = document.querySelector(".elements");

const imagePopup = overlay.querySelector(".image-popup");
const formPopup = overlay.querySelector(".edit-form");
const imageForm = overlay.querySelector(".image-form");

const profileEdit = document.querySelector(".profile__info-btn");
const modal = overlay.querySelector(".image-form");
const modalProfile = overlay.querySelector(".edit-form");

// FUNCTIONS
function overlayToggle() {
  overlay.classList.toggle("overlay_popup");
  console.log("HEY");
}

function imageToggle() {
  if (imagePopup.classList.contains("image-popup_on")) {
    imagePopup.classList.remove("image-popup_on");
  }
}

function formToggle() {
  if (formPopup.classList.contains("edit-form_on")) {
    formPopup.classList.remove("edit-form_on");
  }
}

function imageFormToggle() {
  if (imageForm.classList.contains("image-form_on")) {
    imageForm.classList.remove("image-form_on");
  }
}

// EVENT LISTENER CLOSE ICON

overlay.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-icon")) {
    overlayToggle()
    imageToggle()
    formToggle()
    imageFormToggle()
  }
});

// PROFILE: NAME AND PROFESSION
profileEdit.addEventListener("click", function (evt) {
  evt.preventDefault();
  const nameText = document.querySelector(".profile__info-title");
  const aboutText = document.querySelector(".profile__info-about");
  overlayToggle()
  modalProfile.classList.toggle("edit-form_on");
  modalProfile.querySelector(".edit-form__title").textContent = "Edit profile";
  modalProfile.querySelector(".edit-form__input_name").value = nameText.textContent;
  modalProfile.querySelector(".edit-form__input_about").value = aboutText.textContent;
  modalProfile.querySelector(".edit-form__btn").textContent = "Save";
  modalProfile.querySelector(".edit-form__btn").addEventListener("click", function (evt) {
    evt.preventDefault();
    if (modalProfile.querySelector(".edit-form__input_name").value == "" || modalProfile.querySelector(".edit-form__input_about").value == "") {
      alert("Please, insert valid information.")
    } else {
      nameText.textContent = modalProfile.querySelector(".edit-form__input_name").value;
      aboutText.textContent = modalProfile.querySelector(".edit-form__input_about").value;
      overlayToggle()
      formToggle()
    }
  });
});


  // ADDING CARD
  const addPlace = document.querySelector(".profile__add-btn");
  addPlace.addEventListener("click", function(evt) {
    evt.preventDefault();
    overlayToggle();
    imageForm.classList.toggle("image-form_on");
    modal.querySelector(".image-form__title").textContent = "New Place";
    modal.querySelector(".image-form__input_name").value = "";
    modal.querySelector(".image-form__input_about").value = "";
    modal.querySelector(".image-form__input_name").placeholder = "Title";
    modal.querySelector(".image-form__input_about").placeholder = "Image URL";
    modal.querySelector(".image-form__btn").textContent = "Create";
    modal.querySelector(".image-form__btn").addEventListener("click", function (evt) {
      evt.preventDefault();
      if (modal.querySelector(".image-form__input_about").value !== "" && modal.querySelector(".image-form__input_name").value !== "") {
        overlayToggle();
        imageFormToggle()
        const newCard = element.cloneNode(true);
        elementSection.prepend(newCard);
        newCard.querySelector(".element__image").src = modal.querySelector(".image-form__input_about").value;
        newCard.querySelector(".element__image").alt = `Picture of ${modal.querySelector(".image-form__input_name").value}`;
        newCard.querySelector(".element__title").textContent = modal.querySelector(".image-form__input_name").value;
      } else {
        alert("Please, insert valid information.")
      }
    });
  });

// PICTURE POPUP
elementSection.addEventListener("click", function (event) {
  if (event.target.classList.contains("element__image")) {
    overlayToggle();
    const imageOn = overlay.querySelector(".image-popup").classList.toggle("image-popup_on");
    const imagePic = overlay.querySelector(".image-popup__picture");
    const imageFig = overlay.querySelector(".image-popup__caption");
    imagePic.src = event.target.src;
    imagePic.alt = event.target.alt;
    imageFig.textContent = event.target.alt;
  }
});



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

initialCards.forEach(item => {
  const cloneCard = element.cloneNode(true);
  cloneCard.querySelector(".element__image").src = item.link;
  cloneCard.querySelector(".element__image").alt = `Picture of ${item.name}`;
  cloneCard.querySelector(".element__title").textContent = item.name;
  elementSection.append(cloneCard);
});

// LIKE BTN
elementSection.addEventListener("click", function (event) {
  if (event.target.classList.contains("element__like-btn")) {
    event.target.classList.toggle("element__like-black");
  };
});

// TRASH BTN
elementSection.addEventListener("click", function (event) {
  if (event.target.tagName == "BUTTON" && event.target.classList.contains("element__trash")) {
    const del = event.target.closest(".element");
    del.remove();
  }
});


