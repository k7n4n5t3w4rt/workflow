// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// FUNCTION: flwItmTracker()
//------------------------------------------------------------------
export const flwItmTracker = (
  flwItmName /*: string */,
  message /*: string */,
) /*: void  */ => {
  if (gSttngs().get("debug") === true) {
    gState().get("flwItmTracker")[flwItmName].unshift(message);
  }
};
export default flwItmTracker;
