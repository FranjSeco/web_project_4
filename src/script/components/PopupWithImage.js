import Popup from "../components/Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    const image = this._popupSelector.querySelector(".image-popup__picture");
    const caption = this._popupSelector.querySelector(".image-popup__caption");

    image.src = link;
    caption.textContent = name;
  }
}

export default PopupWithImage;
