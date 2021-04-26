import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { avatarBtn, imageBtn, profileBtn, avatarEdit, currentName, currentJob, cardElementSelector, addPlace, profileEdit, settings } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import DeletePopupForm from "../components/DeletePopupForm.js";
import UserInfo from "../components/UserInfo.js";
import renderLoading from "../utils/utils.js";
import "../../styles/pages/index.css";


// VALIDATION
const editFormValidator = new FormValidator(settings, document.querySelector(".edit-form"));
const addFormValidator = new FormValidator(settings, document.querySelector(".image-form"));
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/////////////// API ///////////////
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  headers: {
    authorization: "3199dd72-198f-4d27-96ce-739071f3c183",
    "Content-Type": "application/json"
  }
});

// getServerInfo
api.getServerInfo()
  .then(([cardsData, webInfo]) => {
    const userID = webInfo._id;

    // FUNCTION FOR RENDERING CARDS
    function renderCards(cardItem) {
      return new Card(
        cardItem,
        () => {
          imageOverviewPopup.open(cardItem.name, cardItem.link)
        },
        (cardID, cardElement) => {
          deleteFormPopup.open(cardID, cardElement);
        },
        (cardElement, cardID) => {
          if (cardElement.isLiked()) {
            api.removeLike(cardID)
              .then(element => {
                cardElement.updateLikes(element.likes)
              })
              .catch(err => console.log(err))
          } else {
            api.addLike(cardID)
              .then(element => {
                cardElement.updateLikes(element.likes);
                cardElement.showLikes();
              })
              .catch((err) => {
                console.log(err);
              })
          }
        }, userID).getCard()
    }

    // API FOR USERINFO
    userInfo.setUserInfo({ newName: webInfo.name, newJob: webInfo.about, avatarSrc: webInfo.avatar })

    // INITIAL SETUP SECTION
    const initialSetup = new Section({
      items: cardsData,
      renderer: (cardItem) => {
        const card = renderCards(cardItem);
        initialSetup.addItem(card);
      }
    }, cardElementSelector)
    initialSetup.renderCards();

    //FOR ADDING CARDS
    const imageFormPopup = new PopupWithForm(
      "#imageFormOverlay",
      (data) => {
        renderLoading(true, imageBtn);
        api.addCard(data)
          .then((data) => {
            initialSetup.prependItem(renderCards(data));
            renderLoading(false, imageBtn);
          })
          .then(() => imageFormPopup.close())
          .catch((err) => {
            console.log(err);
          })
      }
    );

    // SET EVENT LISTENERS
    imageFormPopup.setEventListeners();

    /////////////// EVENT LISTENERS ///////////////
    // ADD CARD
    addPlace.addEventListener("click", () => {
      imageFormPopup.open();
    })
  })
  .catch(err => console.log(err));

/////////////// EVENT LISTENERS ///////////////
// PROFILE: NAME AND JOB
profileEdit.addEventListener("click", () => {
  editFormPopup.open();
  const getValues = userInfo.getUserInfo();
  currentName.value = getValues.name;
  currentJob.value = getValues.job;
});

// AVATAR
avatarEdit.addEventListener("click", () => {
  avatarFormPopup.open()
});

// USERINFO SELECTORS
const userInfo = new UserInfo(".profile__info-title", ".profile__info-about", ".profile__avatar-image");

//////////////////// FORMS ////////////////////
// POPUP AVATAR FORM
const avatarFormPopup = new PopupWithForm("#avatarFormOverlay",
  (data) => {
    renderLoading(true, avatarBtn);
    api.editAvatar(data.link)
      .then((res) => {
        userInfo.setUserInfo({ newName: res.name, newJob: res.about, avatarSrc: res.avatar })
        renderLoading(false, avatarBtn);
      })
      .then(() => avatarFormPopup.close())
      .catch((err) => {
        console.log(err);
      })
  })

// POPUP IMAGE OVERVIEW
const imageOverviewPopup = new PopupWithImage("#imageOverlay");

// POPUP PROFILE FORM
const editFormPopup = new PopupWithForm(
  "#profileFormOverlay", (data) => {
    renderLoading(true, profileBtn);
    // API FOR EDITING PROFILE
    api.editProfile({ name: data.Name, about: data.About })
      .then(data => {
        userInfo.setUserInfo({ newName: data.name, newJob: data.about, avatarSrc: data.avatar });
        renderLoading(false, profileBtn);
      })
      .then(() => {
        editFormPopup.close()
      })
      .catch((err) => {
        console.log(err);
      })
  }
);

// DELETE FORM
const deleteFormPopup = new DeletePopupForm("#deleteFormOverlay",
  (cardID) => {
    api.removeCard(cardID)
      .then(() => {
        deleteFormPopup.close();
        deleteFormPopup.removeCardElement();
      })
      .catch((err) => {
        console.log(err);
      })
  }
);

// SET EVENT LISTENERS
deleteFormPopup.setEventListeners();
editFormPopup.setEventListeners();
imageOverviewPopup.setEventListeners();
avatarFormPopup.setEventListeners();
