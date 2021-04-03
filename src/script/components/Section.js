class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderer() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(element) {
    this._containerSelector.append(element);
  }
}

export default Section;
