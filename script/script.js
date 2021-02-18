// FORM OVERLAY
const form = document.querySelector("#form-template").content;
const overlay = form.querySelector(".overlay");
const page = document.querySelector(".page");

// EDIT FORM: NAME AND ABOUT
const editBtn = document.querySelector(".profile__info-btn");

editBtn.addEventListener("click", function () {
  console.log("Click");
  let nameText = document.querySelector(".profile__info-title");
  let aboutText = document.querySelector(".profile__info-about");

  const editClick = overlay.cloneNode(true);
  page.append(editClick);
  editClick.classList.add("overlay_popup");
  editClick.querySelector(".edit-form__title").textContent = "Edit profile";
  editClick.querySelector(".edit-form__input_name").placeholder = nameText.textContent;
  editClick.querySelector(".edit-form__input_about").placeholder = aboutText.textContent;
  editClick.querySelector(".edit-form__close-icon").addEventListener("click", function () {
    editClick.classList.remove("overlay_popup");
  });

  editClick.querySelector(".edit-form__btn").addEventListener("click", function (evt) {
    evt.preventDefault();
    nameText.textContent = editClick.querySelector(".edit-form__input_name").value;
    aboutText.textContent = editClick.querySelector(".edit-form__input_about").value;
    editClick.classList.remove("overlay_popup");
  });
});

// ADDING CARD FORM
const addBtn = document.querySelector(".profile__add-btn");


addBtn.addEventListener("click", function () {
  const addClick = overlay.cloneNode(true);
  page.append(addClick);
  addClick.classList.add("overlay_popup");
  addClick.querySelector(".edit-form__title").textContent = "New Place";
  addClick.querySelector(".edit-form__input_name").placeholder = "Title";
  addClick.querySelector(".edit-form__input_about").placeholder = "Image URL";
  addClick.querySelector(".edit-form__close-icon").addEventListener("click", function () {
    addClick.classList.remove("overlay_popup");
  });

  addClick.querySelector(".edit-form__btn").addEventListener("click", function (evt) {
    evt.preventDefault();
    const newCard = element.cloneNode(true);
    elementSection.prepend(newCard);
    newCard.querySelector(".element__image").src = addClick.querySelector(".edit-form__input_about").value;
    newCard.querySelector(".element__image").alt = `Picture of ${addClick.querySelector(".edit-form__input_name").value}`;
    newCard.querySelector(".element__title").textContent = addClick.querySelector(".edit-form__input_name").value;
    addClick.classList.remove("overlay_popup");
  });
});



// CARD TEMPLATE

const cards = document.querySelector("#el-template").content;
const element = cards.querySelector(".element");
const elementSection = document.querySelector(".elements");
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

const likeBtn = document.querySelector(".elements");

likeBtn.addEventListener("click", function(event) {

  const eventTarget = event.target;
  console.log(eventTarget);
  if (eventTarget.classList.contains("element__like")) {
    eventTarget.classList.add("element__like-black");
  }
});
