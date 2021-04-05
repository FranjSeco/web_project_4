import Popup from "../components/Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
    this._submitHandler = this._submitHandler.bind(this);
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
    this._form.addEventListener("submit", this._submitHandler);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    const submittedValue = this._getInputValues();

    this._popupSubmit(submittedValue);

  }
}

export default PopupWithForm;
