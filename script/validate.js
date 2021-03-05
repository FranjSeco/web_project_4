// VALIDATION


const showInputError = (settings, errorMessage) => {

  const formInput = document.querySelector(settings.inputSelector);
  const formElement = document.querySelector(settings.formSelector);

  const formError = document.querySelector(settings.spanElement);
  formInput.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);
};

const hideInputError = (settings) => {
  const formInput = document.querySelector(settings.inputSelector);
  const formElement = document.querySelector(settings.formSelector);
  const formError = formElement.querySelector(settings.spanElement);
  formInput.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.inputErrorClass);
  formError.textContent = "";
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};




const setEventListeners = (settings) => {
  const formInput = document.querySelector(settings.inputSelector);
  const formElement = document.querySelector(settings.formSelector);
  const inputList = Array.from(document.querySelectorAll(settings.inputSelector));
  const buttonElement = document.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(formElement, formInput, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  const inactive = document.querySelector(settings.inactiveButtonClass);
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactive);
  } else {
    buttonElement.classList.remove(inactive);
  }
};

const enableValidation = (settings) => {
  const formElement = document.querySelector(settings.formSelector);
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
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
