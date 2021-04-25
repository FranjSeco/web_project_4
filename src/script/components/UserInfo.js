class UserInfo {
  constructor(name, job, avatar) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return this.userInfo = { name: this._name.textContent, job: this._about.textContent, avatar: this._avatar.src };
  }

  setUserInfo({newName, newJob, avatarSrc}) {
    this._name.textContent = newName;
    this._about.textContent = newJob;
    this._avatar.src = avatarSrc;
  }
}

export default UserInfo;
