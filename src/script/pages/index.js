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

// USERINFO
const userInfo = new UserInfo(".profile__info-title", ".profile__info-about", ".edit-form__input_name", ".edit-form__input_about");

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

// ADDING CARD FUNCTION
// const renderCard = () => {
//   // const cardDataForm = imageFormOverlay.querySelector(".image-form__form");
//   // const cardInfo = [
//   //   {
//   //     name: cardDataForm.elements.Place.value,
//   //     link: cardDataForm.elements.Link.value
//   //   }
//   // ];

// }







// ADDING CARD BTN EVENT LISTENER
addPlace.addEventListener("click", function () {
  imageFormPopup.open();
});

// PROFILE: NAME AND PROFESSION
profileEdit.addEventListener("click", function () {
  editFormPopup.open();
  userInfo.getUserInfo();
});



// POPUPS
const editFormPopup = new PopupWithForm(
  "#profileFormOverlay", () => {
    userInfo.setUserInfo(currentName.value, currentJob.value);
    editFormPopup.close();
  }
);
editFormPopup.setEventListeners();

const imageFormPopup = new PopupWithForm(
  "#imageFormOverlay",
  (object) => {
    const cardInfo = [
      {
        name: object.Place,
        link: object.Link
      }
    ];
    const prependCard = new Section({
      items: cardInfo, renderer: (cardItem) => {
        const newCardPrepend = new Card(
          cardItem,
          () => {
            imageOverviewPopup.open(cardInfo[0].name, cardInfo[0].link);
          }
        );
        prependCard.prependItems(newCardPrepend.getCard());
      }
    },
      cardElementSelector
    );
    prependCard.renderer();
    imageFormPopup.close();
  }
);

imageFormPopup.setEventListeners();


const imageOverviewPopup = new PopupWithImage("#imageOverlay");
imageOverviewPopup.setEventListeners();
