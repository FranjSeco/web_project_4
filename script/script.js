// POP-UP

let popUp = document.querySelector(".profile__info-btn");
let closeDown = document.querySelector(".edit-form__close-icon");
let closeBtn = document.querySelector(".overlay");

function editBox() {
  let openOver = document.querySelector(".overlay").classList.add("overlay_popup");
}

function closeIcon() {

  closeBtn.classList.remove("overlay_popup")
}


closeDown.addEventListener("click", closeIcon);
popUp.addEventListener("click", editBox);


// EDIT FORM: NAME AND ABOUT

let nameText = document.querySelector(".profile__info-title").textContent;
let aboutText = document.querySelector(".profile__info-about").textContent;
let placeName = document.querySelector(".edit-form__input_name");
let placeAbout = document.querySelector(".edit-form__input_about");


let newPlaceholder = placeName.setAttribute("value", nameText);

let newAbout = placeAbout.setAttribute("value", aboutText);

// SAVING PROFILE

let save = document.querySelector(".edit-form__form");

function saving(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".edit-form__input_name").value;
  let aboutInput = document.querySelector(".edit-form__input_about").value;

  let titleText = document.querySelector(".profile__info-title");
  let aboutText = document.querySelector(".profile__info-about");


  titleText.textContent = nameInput;
  aboutText.textContent = aboutInput;

  closeIcon()
}

save.addEventListener("submit", saving);

// Like element 1

let heart = document.querySelector("#firstElement");
let heartSecond = document.querySelector("#secondElement");
let heartThird = document.querySelector("#thirdElement");
let heartFourth = document.querySelector("#fourthElement");
let heartFifth = document.querySelector("#fifthElement");
let heartSixth = document.querySelector("#sixthElement");


function changeHeart1() {
  let heartClass1 = heart.classList;
  if (heartClass1.contains("element__like_disable")) {
    heartClass1.remove("element__like_disable");
    heartClass1.add("element__like_active");
  } else {
    heartClass1.remove("element__like_active");
    heartClass1.add("element__like_disable");
  }
}
function changeHeart2() {
  let heartClass2 = heartSecond.classList;
  if (heartClass2.contains("element__like_disable")) {
    heartClass2.remove("element__like_disable");
    heartClass2.add("element__like_active");
  } else {
    heartClass2.remove("element__like_active");
    heartClass2.add("element__like_disable");
  }
}
function changeHeart3() {
  let heartClass3 = heartThird.classList;
  if (heartClass3.contains("element__like_disable")) {
    heartClass3.remove("element__like_disable");
    heartClass3.add("element__like_active");
  } else {
    heartClass3.remove("element__like_active");
    heartClass3.add("element__like_disable");
  }
}
function changeHeart4() {
  let heartClass4 = heartFourth.classList;
  if (heartClass4.contains("element__like_disable")) {
    heartClass4.remove("element__like_disable");
    heartClass4.add("element__like_active");
  } else {
    heartClass4.remove("element__like_active");
    heartClass4.add("element__like_disable");
  }
}
function changeHeart5() {
  let heartClass5 = heartFifth.classList;
  if (heartClass5.contains("element__like_disable")) {
    heartClass5.remove("element__like_disable");
    heartClass5.add("element__like_active");
  } else {
    heartClass5.remove("element__like_active");
    heartClass5.add("element__like_disable");
  }
}
function changeHeart6() {
  let heartClass6 = heartSixth.classList;
  if (heartClass6.contains("element__like_disable")) {
    heartClass6.remove("element__like_disable");
    heartClass6.add("element__like_active");
  } else {
    heartClass6.remove("element__like_active");
    heartClass6.add("element__like_disable");
  }
}

heart.addEventListener("click", changeHeart1);
heartSecond.addEventListener("click", changeHeart2);
heartThird.addEventListener("click", changeHeart3);
heartFourth.addEventListener("click", changeHeart4);
heartFifth.addEventListener("click", changeHeart5);
heartSixth.addEventListener("click", changeHeart6);




