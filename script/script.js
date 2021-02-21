//VARIABLES
const form = document.querySelector("#form-template").content;
const page = document.querySelector(".page");
const overlay = form.querySelector(".overlay");
const editBtn = document.querySelector(".profile__info-btn");
const addBtn = document.querySelector(".profile__add-btn");
const cards = document.querySelector("#el-template").content;
const element = cards.querySelector(".element");
const elementSection = document.querySelector(".elements");

// FUNCTIONS
// function overlayClone() {
//   const overlayClick = overlay.cloneNode(true);
//   page.append(editClick);
//   const overlayOn = document.querySelector(".overlay");
//   overlayOn.style.visibility = "1";
//   overlayOn.style.opacity = "1";
//   overlayOn.style.transition = "all 1s";
// }

// EVENT LISTENER CLOSE ICON
page.addEventListener("click", function (event) {
  if (event.target.tagName == "BUTTON" && event.target.classList.contains("close-icon")) {
    const overlayPage = document.querySelector(".overlay");
    overlayPage.style.visibility = "0";
    overlayPage.style.opacity = "0";
    overlayPage.style.transition = "all 0.5s";
    setTimeout(function () {
      overlayPage.remove();
    }, 700);
  }
});


// EDIT FORM: NAME AND ABOUT

editBtn.addEventListener("click", function () {
  let nameText = document.querySelector(".profile__info-title");
  let aboutText = document.querySelector(".profile__info-about");
  const editClick = overlay.cloneNode(true);
  page.append(editClick);
  editClick.classList.add("overlay_popup");
  editClick.querySelector(".edit-form__title").textContent = "Edit profile";
  editClick.querySelector(".edit-form__input_name").placeholder = nameText.textContent;
  editClick.querySelector(".edit-form__input_about").placeholder = aboutText.textContent;
  editClick.querySelector(".edit-form__btn").textContent = "Save";
  editClick.querySelector(".edit-form__btn").addEventListener("click", function (evt) {
    evt.preventDefault();
    if (editClick.querySelector(".edit-form__input_name").value == "" || editClick.querySelector(".edit-form__input_about").value == "") {
      alert("Please, insert valid information.")
    } else {
      nameText.textContent = editClick.querySelector(".edit-form__input_name").value;
      aboutText.textContent = editClick.querySelector(".edit-form__input_about").value;
      editClick.style.visibility = "0";
      editClick.style.opacity = "0";
      editClick.style.transition = "all 0.5s";
      setTimeout(function () {
        editClick.remove();
      }, 700);
    }
  });
});

// ADDING CARD FORM

addBtn.addEventListener("click", function () {
  const addClick = overlay.cloneNode(true);
  page.append(addClick);
  addClick.classList.add("overlay_popup");
  addClick.querySelector(".edit-form__title").textContent = "New Place";
  addClick.querySelector(".edit-form__input_name").placeholder = "Title";
  addClick.querySelector(".edit-form__input_about").placeholder = "Image URL";
  addClick.querySelector(".edit-form__btn").textContent = "Create";
  addClick.querySelector(".edit-form__btn").addEventListener("click", function (evt) {
    evt.preventDefault();
    if (addClick.querySelector(".edit-form__input_about").value !== "" && addClick.querySelector(".edit-form__input_name").value !== "") {
      const newCard = element.cloneNode(true);
      elementSection.prepend(newCard);
      newCard.querySelector(".element__image").src = addClick.querySelector(".edit-form__input_about").value;
      newCard.querySelector(".element__image").alt = `Picture of ${addClick.querySelector(".edit-form__input_name").value}`;
      newCard.querySelector(".element__title").textContent = addClick.querySelector(".edit-form__input_name").value;
      addClick.style.visibility = "0";
      addClick.style.opacity = "0";
      addClick.style.transition = "all 0.5s";
      setTimeout(function () {
        addClick.remove();
      }, 700);
    } else {
      alert("Please, insert valid information.")
    }
  });
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
page.addEventListener("click", function (event) {
  if (event.target.tagName == "BUTTON" && event.target.classList.contains("element__like-btn")) {
    if (event.target.classList.contains("element__like-black")) {
      event.target.classList.remove("element__like-black");
    } else {
      event.target.classList.add("element__like-black");
    }
  };
});


// TRASH BTN
page.addEventListener("click", function (event) {
  if (event.target.tagName == "BUTTON" && event.target.classList.contains("element__trash")) {
    const del = event.target.closest(".element");
    del.remove();
  }
});

// PICTURE POPUP
page.addEventListener("click", function (event) {
  if (event.target.tagName == "IMG" && event.target.classList.contains("element__image")) {
    const imageClick = overlay.cloneNode(true);
    page.append(imageClick);
    imageClick.classList.add("overlay_popup");
    imageClick.querySelector(".edit-form").style.display = "none";
    imageClick.querySelector(".image-popup").style.display = "flex";
    const imagePop = imageClick.querySelector(".image-popup__picture");
    imagePop.style.display = "flex";
    imagePop.src = event.target.src;
    imagePop.alt = event.target.alt;
  }
});

