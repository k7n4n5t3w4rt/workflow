// @flow
function gModel() /*: void */ {
  this.keyValuePairs = {};

  this.set = (key /*: string */, value /*: any  */) /*: () => void */ => {
    this.keyValuePairs[key] = value;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
    return this;
  };
  // Set this, but only if it is not already in the cache.
  this.setIfNotCached = (
    key /*: string */,
    value /*: any  */,
  ) /*: () => void */ => {
    this.keyValuePairs[key] = value;
    try {
      const cachedValue = JSON.parse(localStorage.getItem(key) || "");
      if (cachedValue) {
        this.keyValuePairs[key] = cachedValue;
      }
    } catch (e) {}
    return this;
  };
  this.get = (key /*: string */) /*: any */ => {
    const value = this.keyValuePairs[key];
    return value;
  };
}

export default gModel;
