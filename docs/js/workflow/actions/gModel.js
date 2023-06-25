// @flow

function gModel() /*: void */ {
  this.keyValuePairs = {};

  this.set = (key /*: string */, value /*: any  */) /*: void */ => {
    this.keyValuePairs[key] = value;
  };
  this.get = (key /*: string */) /*: any */ => {
    return this.keyValuePairs[key];
  };
}

export default gModel;
