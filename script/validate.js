// VALIDATION
const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.inputErrorClass);
};

const hideInputError = (formElement, formInput, settings) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = "";
};

const isValid = (formElement, formInput, settings) => {

  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

// formElement.addEventListener("submit", function (evt) {
//   evt.preventDefault();
// });


const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.formInput));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList, formInput, settings) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
};

const toggleButtonState = (inputList, submitButtonSelector, settings) => {
  if (hasInvalidInput(inputList, settings)) {
    submitButtonSelector.classList.add(settings.inactiveButtonClass);
    console.log(settings.submitButtonSelector.classList);
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
