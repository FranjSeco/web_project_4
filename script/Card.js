
const imageOverlay = document.querySelector("#imageOverlay");
const imagePic = imageOverlay.querySelector(".image-popup__picture");
const imageFig = imageOverlay.querySelector(".image-popup__caption");


function toggleModalWindow(modal) {
  modal.classList.toggle("overlay_popup");
  if (modal.classList.contains("overlay_popup")) {
    document.addEventListener('keydown', closeEsc);
  } else {
    document.removeEventListener('keydown', closeEsc);
  }
}

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.overlay_popup');
    toggleModalWindow(openedPopup);
  }
}


class Card {
  constructor(card, cardTemplateSelector) {
    this._card = card;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _handleLikeIcon(event) {
    event.target.classList.toggle("element__like-black");
  }

  _handleDeleteCard(evt) {
    evt.target.closest(".element").remove();
  }

  _handlePreviewPicture(event) {
    toggleModalWindow(imageOverlay);
    imagePic.src = event.target.src;
    imagePic.alt = event.target.alt;
    imageFig.textContent = event.target.alt;
  }

  _setEventListener() {
    const cardLike = this._cloneCard.querySelector(".element__like-btn");
    const cardDeleteButton = this._cloneCard.querySelector('.element__trash');


    cardLike.addEventListener("click", this._handleLikeIcon);
    cardDeleteButton.addEventListener("click", this._handleDeleteCard);
    this._cardImage.addEventListener("click", this._handlePreviewPicture);

  }

  getCard() {
    const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector(".element");

    this._cloneCard = cardTemplate.cloneNode(true);

    this._cardImage = this._cloneCard.querySelector(".element__image");
    this._cardName = this._cloneCard.querySelector(".element__title");

    this._cardImage.src = this._card.link;
    this._cardName.textContent = this._card.name;
    this._cardImage.alt = `Picture of ${this._cardName.textContent}`;

    this._setEventListener();

    return this._cloneCard;
  }
}

export default Card;
