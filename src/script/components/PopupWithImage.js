import Popup from "../components/Popup.js";

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);

    this._image = this._popup.querySelector(".image-popup__picture");
    this._caption = this._popup.querySelector(".image-popup__caption");
  }

  open(name, link) {
    super.open();

    this._image.src = link;
    this._caption.textContent = name;
  }
}

export default PopupWithImage;
