// @flow
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";

export default (
  flwItmName /*: string */,
  message /*: string */,
) /*: void  */ => {
  if (gSttngs().debug === true) {
    gState().flwItmTracker[flwItmName].unshift(message);
  }
};
