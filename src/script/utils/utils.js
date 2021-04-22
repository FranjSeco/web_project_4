export default function renderLoading(isLoading, selector, closingPopUp) {
  if (isLoading) {
    selector.textContent = "Saving...";
  } else {
    selector.textContent = "Save";
  }
}
