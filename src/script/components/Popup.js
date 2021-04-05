class Popup {
  constructor(popupSelector) {
  this._popupSelector = document.querySelector(popupSelector);
  this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add("overlay_popup");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("overlay_popup");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.keyCode === 27) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("close-icon") || evt.target.classList.contains('overlay_popup')) {
        this.close();
      }
    })
  }
}

export default Popup;
