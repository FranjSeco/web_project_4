// VALIDATION
const formElement = document.querySelector(".form");
const formInput = formElement.querySelector(".form-input");


const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add("form-input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("form-input-error_active");
};

const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove("form-input_type_error");
  formError.classList.remove("form-input-error_active");
  formError.textContent = "";
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
});


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form-input"));
  const buttonElement = formElement.querySelector(".form-submit");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form-submit_inactive");
  } else {
    buttonElement.classList.remove("form-submit_inactive");
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});
