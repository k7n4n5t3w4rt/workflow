// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import click from "./click";
import populateSteps from "./populateStepsOnStart";
import ambientLightSetup from "./ambientLightSetup";
import directionalLightSetup from "./directionalLightSetup";
import createValueSphere from "./createValueSphere";
import setEndPosition from "./setEndPosition";
import setStartPosition from "./setStartPosition";
import orientEverythingToTheClickCube from "./orientEverythingToTheClickCube";
import newClickCube from "./newClickCube";
import hideReticule from "./hideReticule";
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
