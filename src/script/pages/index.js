import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { avatarBtn, imageBtn, profileBtn, avatarEdit, currentName, currentJob, cardElementSelector, addPlace, profileEdit, settings } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import renderLoading from "../utils/utils.js";
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
          (cardID, cardTrash) => {
            const deleteFormPopup = new PopupWithForm("#deleteFormOverlay",
              (cardID) => {
                api.removeCard(cardID)
                  .then(() => {
                    cardTrash.closest(".element").remove();
                    deleteFormPopup.close();
                  })
              }
            );
            deleteFormPopup.setEventListeners();
            deleteFormPopup.open(cardID);
          },
          (cardElement, cardID) => {
            if (cardElement.isLiked()) {
              api.removeLike(cardID)
                .then(element => {
                  cardElement.updateLikes(element.likes)
                })
            } else {
              api.addLike(cardID)
                .then(element => {
                  cardElement.updateLikes(element.likes);
                  cardElement.showLikes();
                })
            }
          }
        );
        initialSetup.addItem(newCard.getCard());
      }
    },
      cardElementSelector
    );
    initialSetup.renderer();

    // FORM POPUP FOR ADDING IMAGES
    const imageFormPopup = new PopupWithForm(
      "#imageFormOverlay",
      (data) => {
        renderLoading(true, imageBtn);
        api.addCard(data)
          .then((data) => {
            const newCardPrepend = new Card(
              data,
              () => {
                imageOverviewPopup.open(data.name, data.link);
              },
              (cardID, cardTrash) => {
                // POPUP DELETE FORM
                const deleteFormPopup = new PopupWithForm(
                  "#deleteFormOverlay",
                  (cardID) => {
                    api.removeCard(cardID)
                      .then(() => {
                        cardTrash.closest(".element").remove();
                        deleteFormPopup.close();
                      })
                  }
                );
                deleteFormPopup.open(cardID);
                deleteFormPopup.setEventListeners();
              }
            );
            initialSetup.prependItem(newCardPrepend.getCard());
            renderLoading(false, imageBtn);
          })
          .finally(() => {
            imageFormPopup.close()
          })
      }
    );
    addPlace.addEventListener("click", () => {
      imageFormPopup.open();
    });
    imageFormPopup.setEventListeners();
  });

// USERINFO SELECTORS
const userInfo = new UserInfo(".profile__info-title", ".profile__info-about", ".edit-form__input_name", ".edit-form__input_about", ".profile__avatar-image");

// API FOR USERINFO
api.apiUserInfo()
  .then(res => {
    userInfo.setUserInfo({ newName: res.name, newJob: res.about, avatarSrc: res.avatar })
  })

// PROFILE: NAME AND PROFESSION
profileEdit.addEventListener("click", () => {
  editFormPopup.open();
  const getValues = userInfo.getUserInfo();
  currentName.value = getValues.name;
  currentJob.value = getValues.job;
});

// POPUP PROFILE FORM
const editFormPopup = new PopupWithForm(
  "#profileFormOverlay", (data) => {
    renderLoading(true, profileBtn);
    // API FOR EDITING PROFILE
    api.editProfile({ name: data.Name, about: data.About })
      .then(data => {
        const avatarSource = userInfo.getUserInfo();
        userInfo.setUserInfo({ newName: data.name, newJob: data.about, avatarSrc: avatarSource.avatar });
        renderLoading(false, profileBtn);
      })
      .finally(() => {
        editFormPopup.close()
      })
  }
);
editFormPopup.setEventListeners();

// POPUP AVATAR FORM
const avatarFormPopup = new PopupWithForm("#avatarFormOverlay",
  (data) => {
    renderLoading(true, avatarBtn);
    api.editAvatar(data.link)
      .then(() => {
        api.apiUserInfo()
          .then((res) => {
            userInfo.setUserInfo({ newName: res.name, newJob: res.about, avatarSrc: res.avatar })
            renderLoading(false, avatarBtn);
          })
      })
      .finally(() => {
        avatarFormPopup.close()
      })
  })

avatarFormPopup.setEventListeners();
avatarEdit.addEventListener("click", () => {
  avatarFormPopup.open()
});

// POPUP IMAGE OVERVIEW
const imageOverviewPopup = new PopupWithImage("#imageOverlay");
imageOverviewPopup.setEventListeners();

