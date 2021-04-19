import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { currentName, currentJob, cardElementSelector, addPlace, profileEdit, settings } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../../styles/pages/index.css";


// VALIDATION
const editFormValidator = new FormValidator(settings, document.querySelector(".edit-form"));
const addFormValidator = new FormValidator(settings, document.querySelector(".image-form"));
editFormValidator.enableValidation();
addFormValidator.enableValidation();


// API
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  headers: {
    authorization: "3199dd72-198f-4d27-96ce-739071f3c183",
    "Content-Type": "application/json"
  }
});

// API FOR INITIALCARDS AND ADDING CARDS
api.getInitialCards()
  .then(res => {
    const initialSetup = new Section({
      items: res, renderer: (cardItem) => {
        const newCard = new Card(
          cardItem,
          () => {
            imageOverviewPopup.open(cardItem.name, cardItem.link);
          },
          (cardID) => {
            deleteFormPopup.open(cardID);
          }
        );
        initialSetup.addItem(newCard.getCard());
      }
    },
      cardElementSelector
    );
    initialSetup.renderer();

    const imageFormPopup = new PopupWithForm(
      "#imageFormOverlay",
      (data) => {
        api.addCard(data)
          .then((data) => {
            const newCardPrepend = new Card(
              data,
              () => {
                imageOverviewPopup.open(data.name, data.link);
              }
              ,
              (cardID) => {
                deleteFormPopup.open(cardID);
              }
            );
            initialSetup.prependItem(newCardPrepend.getCard());
            imageFormPopup.close();
          });
      }
    );
    addPlace.addEventListener("click", function () {
      imageFormPopup.open();
    });
    imageFormPopup.setEventListeners();

    // POPUP DELETE FORM
    const deleteFormPopup = new PopupWithForm("#deleteFormOverlay",
      (cardID) => {
        api.removeCard(cardID)
          .then(() => {
            newCard.handleDeleteCard();
            deleteFormPopup.close();
          })
      }
    );
    deleteFormPopup.setEventListeners();
  });


// USERINFO
const userInfo = new UserInfo(".profile__info-title", ".profile__info-about", ".edit-form__input_name", ".edit-form__input_about");

// API FOR USERINFO
api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo({ newName: res.name, newJob: res.about })
  })

// PROFILE: NAME AND PROFESSION
profileEdit.addEventListener("click", function () {
  editFormPopup.open();
  const getValues = userInfo.getUserInfo();
  currentName.value = getValues.name;
  currentJob.value = getValues.job;
});

// POPUP PROFILE FORM
api.editProfile(data)
.then((data) => {
  const editFormPopup = new PopupWithForm(
    "#profileFormOverlay", (data) => {
      userInfo.setUserInfo(data.Name, data.About);
      editFormPopup.close();
    }
  );
  editFormPopup.setEventListeners();
})


// POPUP IMAGE OVERVIEW
const imageOverviewPopup = new PopupWithImage("#imageOverlay");
imageOverviewPopup.setEventListeners();

