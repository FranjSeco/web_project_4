// VALIDATION
const showInputError = (formSelector, inputSelector, settings, errorMessage) => {
  const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);
};

const hideInputError = (formSelector, inputSelector, settings) => {
  const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = "";
};

const isValid = (formSelector, inputSelector, settings) => {

  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, settings, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector, settings);
  }
};

const setEventListeners = (formSelector, settings) => {
  const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector));
  const buttonElement = formSelector.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", () => {
      isValid(formSelector, inputSelector, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
};

const toggleButtonState = (inputList, submitButtonSelector, settings) => {
  if (hasInvalidInput(inputList, settings)) {
    submitButtonSelector.classList.add(settings.inactiveButtonClass);
  } else {
    submitButtonSelector.classList.remove(settings.inactiveButtonClass);
  }
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formSelector, settings);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form-input",
  submitButtonSelector: ".form-submit",
  spanElement: ".form-input-error",
  inactiveButtonClass: "form-submit_inactive",
  inputErrorClass: "form-input_type_error",
  errorClass: "form-input-error_active"
});
