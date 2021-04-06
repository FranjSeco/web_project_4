import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { currentName, currentJob, cardElementSelector, initialCards, imageFormOverlay, addPlace, profileEdit, formImageSubmit, formProfileSubmit, settings } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../../styles/pages/index.css";


// VALIDATION
const editFormValidator = new FormValidator(settings, document.querySelector(".edit-form"));
const addFormValidator = new FormValidator(settings, document.querySelector(".image-form"));
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// INITIAL CARDS
const initialSetup = new Section({
  items: initialCards, renderer: (cardItem) => {
    const newCard = new Card(
      cardItem,
      () => {
        imageOverviewPopup.open(cardItem.name, cardItem.link);
      }
    );
    initialSetup.addItem(newCard.getCard());
  }
},
  cardElementSelector
);

// INITIAL CARDS CALL
initialSetup.renderer();

// ADDING CARD BTN EVENT LISTENER
addPlace.addEventListener("click", function () {
  imageFormPopup.open();
});

// USERINFO
const userInfo = new UserInfo(".profile__info-title", ".profile__info-about", ".edit-form__input_name", ".edit-form__input_about");

// PROFILE: NAME AND PROFESSION
profileEdit.addEventListener("click", function () {
  editFormPopup.open();
  const getValues = userInfo.getUserInfo();
  currentName.value = getValues.name;
  currentJob.value = getValues.job;
});

// POPUP PROFILE FORM
const editFormPopup = new PopupWithForm(
  "#profileFormOverlay", (object) => {
    userInfo.setUserInfo(object.Name, object.About);
    editFormPopup.close();
  }
);
editFormPopup.setEventListeners();

// POPUP IMAGE FORM
const imageFormPopup = new PopupWithForm(
  "#imageFormOverlay",
  (object) => {
    const newCardPrepend = new Card(
      object,
      () => {
        imageOverviewPopup.open(object.Place, object.Link);
      }
    );
    initialSetup.prependItem(newCardPrepend.getCard());
    imageFormPopup.close();
  }
);

imageFormPopup.setEventListeners();

// POPUP IMAGE OVERVIEW
const imageOverviewPopup = new PopupWithImage("#imageOverlay");
imageOverviewPopup.setEventListeners();
