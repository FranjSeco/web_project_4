// VALIDATION
const showInputError = (formElement, formInput, settings, errorMessage) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);
};

const hideInputError = (formElement, formInput, settings) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = "";
};

const isValid = (formElement, formInput, settings) => {

  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, settings, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.formInput));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(formElement, formInput, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
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
  const formList = Array.from(document.querySelectorAll(settings.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formElement: ".form",
  formInput: ".form-input",
  submitButtonSelector: ".form-submit",
  spanElement: ".form-input-error",
  inactiveButtonClass: "form-submit_inactive",
  inputErrorClass: "form-input_type_error",
  errorClass: "form-input-error_active"
});
