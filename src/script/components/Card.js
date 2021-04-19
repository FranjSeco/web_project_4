class Card {
  constructor(items, handleCardClick, handleDeleteClick) {
    this._cardTitle = items.name;
    this._cardLink = items.link;
    this._cardOwnerID = items.owner._id;
    this._id = items._id;
    this._handleCardClick = handleCardClick;

    this._handleDeleteClick = handleDeleteClick;
  }

  id() {
    return this._id;
  }

  handleDeleteCard(evt) {
    evt.target.closest(".element").remove();
  }


  _handleLikeIcon(evt) {
    evt.target.classList.toggle("element__like-black");
  }


  _setEventListener() {
    const cardLike = this._cloneCard.querySelector(".element__like-btn");
    const cardDeleteButton = this._cloneCard.querySelector('.element__trash');
    cardLike.addEventListener("click", this._handleLikeIcon);

    cardDeleteButton.addEventListener("click", () => {this._handleDeleteClick(this.id())});
    // cardDeleteButton.addEventListener("click", this._handleDeleteCard);
    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }


  getCard() {
    const cardTemplate = document.querySelector("#el-template").content.querySelector(".element");
    this._cloneCard = cardTemplate.cloneNode(true);
    this._cardImage = this._cloneCard.querySelector(".element__image");
    this._cardName = this._cloneCard.querySelector(".element__title");
    this._cardTrashIcon = this._cloneCard.querySelector(".element__trash");
    this._cardImage.src = this._cardLink;
    this._cardName.textContent = this._cardTitle;
    this._cardImage.alt = `Picture of ${this._cardName.textContent}`;

    // this renders trash icon only for those items that Ive added. could it be another way of detecting them instead of hardcoding my id?
    if (this._cardOwnerID == "a2fbf9b0cad144ef98de1a23") {
      this._cloneCard.querySelector(".element__trash").classList.add("element__trash_display");
    }


    this._setEventListener();

    return this._cloneCard;
  }
}

export default Card;
