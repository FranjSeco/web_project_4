class Card {
  constructor(items, handleCardClick) {
    this._cardTitle = items.name || items.Place;
    this._cardLink = items.link || items.Link;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeIcon(event) {
    event.target.classList.toggle("element__like-black");
  }

  _handleDeleteCard(evt) {
    evt.target.closest(".element").remove();
  }

  _setEventListener() {
    const cardLike = this._cloneCard.querySelector(".element__like-btn");
    const cardDeleteButton = this._cloneCard.querySelector('.element__trash');
    cardLike.addEventListener("click", this._handleLikeIcon);
    cardDeleteButton.addEventListener("click", this._handleDeleteCard);
    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }

  getCard() {
    const cardTemplate = document.querySelector("#el-template").content.querySelector(".element");
    this._cloneCard = cardTemplate.cloneNode(true);
    this._cardImage = this._cloneCard.querySelector(".element__image");
    this._cardName = this._cloneCard.querySelector(".element__title");
    this._cardImage.src = this._cardLink;
    this._cardName.textContent = this._cardTitle;
    this._cardImage.alt = `Picture of ${this._cardName.textContent}`;
    this._setEventListener();

    return this._cloneCard;
  }
}

export default Card;
