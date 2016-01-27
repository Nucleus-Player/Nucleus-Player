import _ from 'lodash';

class WindowManager {
  constructor() {
    this.windows = {};
    this.nameReferences = {};
    this.IDMap = {};
  }

  add(window, name = null) {
    const newID = Symbol();
    this.windows[newID] = window;
    this.IDMap[window.id] = newID;
    window.on('close', () => {
      delete this.windows[newID];
    });
    if (name) {
      this.nameReferences[name] = this.nameReferences[name] || [];
      this.nameReferences[name].push(newID);
    }
    return newID;
  }

  get(windowID) {
    return this.windows[windowID] || null;
  }

  getByInternalID(internalID) {
    if (this.IDMap[internalID]) {
      return this.windows[this.IDMap[internalID]] || null;
    }
    return null;
  }

  getAll(name) {
    const toReturn = [];
    _.forEach(this.nameReferences[name] || [], (ID) => {
      if (this.get(ID)) {
        toReturn.push(this.get(ID));
      }
    });
    return toReturn;
  }

  close(windowID) {
    if (this.windows[windowID]) {
      this.windows[windowID].close();
    }
  }
}

export default WindowManager;
