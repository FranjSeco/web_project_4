class UserInfo {
  constructor(name, about, nameNew, aboutNew) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._nameNew = document.querySelector(nameNew);
    this._aboutNew = document.querySelector(aboutNew);
  }

  getUserInfo() {
    this._nameNew.value = this._name.textContent;
    this._aboutNew.value = this._about.textContent;
  }

  setUserInfo() {
    this._name.textContent = this._nameNew.value;
    this._about.textContent = this._aboutNew.value;
  }
}

export default UserInfo;
