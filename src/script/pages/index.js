import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { formImageSubmit, initialCards, imageFormOverlay, nameText, aboutText, formImageName, formImageLink, formProfileName, formProfileAbout, addPlace, profileEdit, formProfileSubmit, settings, cardWrapper, cardElementSelector} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../../styles/pages/index.css";

// VALIDATION
const editFormValidator = new FormValidator(settings, document.querySelector(".edit-form"));
const addFormValidator = new FormValidator(settings, document.querySelector(".image-form"));
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// USERINFO
const userInfo = new UserInfo(".profile__info-title", ".profile__info-about", ".edit-form__input_name", ".edit-form__input_about");

// INITIAL CARDS
const initialSetup = new Section({
  items: initialCards, renderer: (cardItem) => {
    const newCard = new Card(
      cardItem, () => {
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

// ADDING CARD FUNCTION
const renderCard = (evt) => {
  evt.preventDefault();
  const cardDataForm = imageFormOverlay.querySelector(".image-form__form");
  const cardInfo = {
    name: cardDataForm.elements.Place.value,
    link: cardDataForm.elements.Link.value
  }
  const newCard = new Card(cardInfo, () => {
    imageOverviewPopup.open(cardInfo.name, cardInfo.link);
  });
  cardWrapper.prepend(newCard.getCard());
  imageFormPopup.close();
}

// ADDING CARD BTN EVENT LISTENER
addPlace.addEventListener("click", function () {
  imageFormPopup.open();
});

// PROFILE: NAME AND PROFESSION
profileEdit.addEventListener("click", function () {
  editFormPopup.open();
  userInfo.getUserInfo();
});

// PROFILE SUBMIT
const profileSubmit = (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo();
  editFormPopup.close();
}

// POPUPS
const editFormPopup = new PopupWithForm("#profileFormOverlay", formProfileSubmit.addEventListener("submit", profileSubmit));
editFormPopup.setEventListeners();

const imageFormPopup = new PopupWithForm("#imageFormOverlay", formImageSubmit.addEventListener("submit", renderCard));
imageFormPopup.setEventListeners();

const imageOverviewPopup = new PopupWithImage("#imageOverlay");
imageOverviewPopup.setEventListeners();
