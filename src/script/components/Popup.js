class Popup {
  constructor(popup) {
  this._popup = document.querySelector(popup);
  this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("overlay_popup");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("overlay_popup");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("close-icon") || evt.target.classList.contains('overlay_popup')) {
        this.close();
      }
    })
  }
}

export default Popup;
