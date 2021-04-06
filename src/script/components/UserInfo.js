class UserInfo {
  constructor(name, job, currentName, currentJob) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(job);
    this._currentName = document.querySelector(currentName);
    this._currentJob = document.querySelector(currentJob);
  }

  getUserInfo() {
    return this.userInfo = { name: this._name.textContent, job: this._about.textContent };
  }

  setUserInfo(newName, newJob) {
    this._name.textContent = newName;
    this._about.textContent = newJob;
  }
}

export default UserInfo;
