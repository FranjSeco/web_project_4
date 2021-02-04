// POP-UP

let popUp = document.querySelector(".profile__info-btn");
let closeDown = document.querySelector(".edit-form__close-icon");

function editBox() {
  let overlay = document.querySelector(".overlay");
  overlay.classList.toggle("hidden");
  let box = document.querySelector(".edit-form");
  box.classList.toggle("hidden");
}

function closeIcon() {
  let closeBtn = document.querySelector(".overlay");
  closeBtn.classList.toggle("hidden");
  let closeBox = document.querySelector(".edit-form");
  closeBox.classList.toggle("hidden");
}


closeDown.addEventListener("click", closeIcon);
popUp.addEventListener("click", editBox);


// EDIT FORM: NAME AND ABOUT

let nameText = document.querySelector(".profile__info-title").textContent;
let aboutText = document.querySelector(".profile__info-about").textContent;
let placeName = document.querySelector(".edit-form__name");
let placeAbout = document.querySelector(".edit-form__about");


let newPlaceholder = placeName.setAttribute("value", nameText);

let newAbout = placeAbout.setAttribute("value", aboutText);

// SAVING PROFILE

let save = document.querySelector(".edit-form__form");

function saving(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".edit-form__name").value;
  let aboutInput = document.querySelector(".edit-form__about").value;

  let titleText = document.querySelector(".profile__info-title");
  let aboutText = document.querySelector(".profile__info-about");


  titleText.textContent = nameInput;
  aboutText.textContent = aboutInput;

  closeIcon();
}

save.addEventListener("submit", saving);

// Like

