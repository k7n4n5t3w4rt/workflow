// @flow

export default () /*: {speed: number}  */ => {
  if (window.global === undefined) {
    window.global = {
      speed: 1,
    };
  }
  return window.global;
};
