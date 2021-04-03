import Popup from "../components/Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    const inputs = [...this._form.querySelectorAll(".form-input")];
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popupSelector.querySelector(".form");
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler;
    })
  }
}

export default PopupWithForm;
