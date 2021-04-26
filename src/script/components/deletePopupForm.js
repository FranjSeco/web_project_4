import Popup from "./Popup.js";


class DeletePopupForm extends Popup {
  constructor(popup, popupSubmit) {
    super(popup);
    this._popupSubmit = popupSubmit;
  }

  open(cardInfo, cardElement){
    super.open();
    this._info = cardInfo;
    this._cardElement = cardElement;
  }

  removeCardElement() {
    this._cardElement.remove();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector(".form");
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._popupSubmit(this._info);
    });
  }

}

export default DeletePopupForm;
