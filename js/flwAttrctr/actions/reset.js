// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import click from "./click.js";
import populateSteps from "./populateSteps.js";
import ambientLightSetup from "./ambientLightSetup.js";
import directionalLightSetup from "./directionalLightSetup.js";
import createValueSphere from "./createValueSphere.js";
import setEndPosition from "./setEndPosition.js";
import setStartPosition from "./setStartPosition.js";
import orientEverythingToTheClickCube from "./orientEverythingToTheClickCube.js";
import newClickCube from "./newClickCube.js";
import hideReticule from "./hideReticule.js";
//------------------------------------------------------------------
// FUNCTION: reset()
//------------------------------------------------------------------
export const reset = async () /*: Promise<void> */ => {
  const scene = gState().get("scnData").scene;
  // --------------------------------------------------------------
  // ! AUTOMODE
  // --------------------------------------------------------------
  // Trying to stop the duplication of the animation arising from
  // subsequent touch events.
  const started = gState().get("started");
  if (started === true) {
    return;
  }
  hideReticule();
  const controller = gState().get("scnData").controller;
  controller.removeEventListener("select", reset);
  const clckCbGroup = gState().get("clckCbGroup");
  const cube = newClickCube();
  // Add the cube to the group (and the THREE.js scene)
  clckCbGroup.add(cube);
  // ..also add the cube to the group object so we can access it later
  clckCbGroup.clckCube = cube;
  orientEverythingToTheClickCube();
  // Change the "started" state to true
  gState().set("started", true);
  click();
};
export default reset;
