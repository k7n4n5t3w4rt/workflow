// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//-------------------------------------------------------------------
// HELPERS
//-------------------------------------------------------------------
import populateStepsHeadless from "./populateStepsHeadless.js";

//------------------------------------------------------------------
// setUpState()
//------------------------------------------------------------------
export const setUpState = () /*: void */ => {
  // Ensure global positions are set for headless mode
  // Explicitly set strtPosition for headless mode
  gState().set("strtPosition", { x: 0, y: 0, z: 0 });
  if (!gState().get("endPosition")) {
    gState().set("endPosition", { x: 10, y: 0, z: -10 });
  }

  if (!gState().get("vSphere")) {
    gState().set("vSphere", {
      dPosition: { x: 10, y: 0, z: -10 },
      x: 10,
      y: 0,
      z: -10,
    });
  }

  // Ensure steps are populated before running the loop
  populateStepsHeadless();
};

export default setUpState;
