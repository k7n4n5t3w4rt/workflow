// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import gState from "./gState.js";

//------------------------------------------------------------------
// getFlwMpSteps()
//------------------------------------------------------------------
export default () /*: Array<FlwMpItems> */ => {
  // Get the keys for all the steps in the flwMap hash map
  const flwMpStpKeys = Object.keys(gState().flwMap);
  // Turn the array of keys into an array of step objects, each of which
  // will be a hash map of flwItems. The key for each flwItem is the
  // flwItem's name property, a dupicate of the uuid property.
  const flwMpSteps = flwMpStpKeys.map((flwMpStpKey /*: string */) => {
    return gState().flwMap[flwMpStpKey];
  });
  return flwMpSteps;
};
