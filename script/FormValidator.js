class FormValidator {
  constructor(settings, formSelector) {
    this._settings = settings;
    this._formSelector = formSelector;
  }

  _showInputError(inputSelector, errorMessage) {
    const formError = this._formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.add(this._settings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputSelector) {
    const formError = this._formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.remove(this._settings.inputErrorClass);
    formError.classList.remove(this._settings.errorClass);
    formError.textContent = "";
  }

  _isValid(inputSelector) {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }

  _toggleButtonState(inputList, submitButtonSelector) {
    if (this._hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add(this._settings.inactiveButtonClass);
    } else {
      submitButtonSelector.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputSelector) => {
      inputSelector.addEventListener("input", () => {
        this._isValid(inputSelector);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  enableValidation() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    });
    this._setEventListeners();
  }
}


export default FormValidator;





