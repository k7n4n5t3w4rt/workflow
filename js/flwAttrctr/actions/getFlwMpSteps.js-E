// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// getFlwMpSteps()
//------------------------------------------------------------------
export default () /*: Array<FlwMpItems> */ => {
  let flwMpSteps = [];
  const flwMap = gState().get("flwMap");
  if (flwMap !== undefined) {
    // Get the keys for all the steps in the flwMap hash map
    const flwMpStpKeys = Object.keys(flwMap);
    // Turn the array of keys into an array of step objects, each of which
    // will be a hash map of flwItems. The key for each flwItem is the
    // flwItem's name property, a dupicate of the uuid property.
    flwMpSteps = flwMpStpKeys.map((flwMpStpKey /*: string */) => {
      return flwMap[flwMpStpKey];
    });
  }
  return flwMpSteps;
};
