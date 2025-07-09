// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
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
