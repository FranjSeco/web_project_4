class UserInfo {
  constructor(name, job, currentName, currentJob, avatar) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
    this._currentName = document.querySelector(currentName);
    this._currentJob = document.querySelector(currentJob);
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
