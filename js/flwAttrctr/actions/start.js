// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import click from "./click";
import populateStepsOnStart from "./populateStepsOnStart";
import ambientLightSetup from "./ambientLightSetup";
import directionalLightSetup from "./directionalLightSetup";
import createValueSphere from "./createValueSphere";
import setEndPosition from "./setEndPosition";
import setStartPosition from "./setStartPosition";
import orientEverythingToTheClickCube from "./orientEverythingToTheClickCube";
import createClickCubeGroup from "./createClickCubeGroup";
import hideReticule from "./hideReticule";
//------------------------------------------------------------------
// FUNCTION: start()
//------------------------------------------------------------------
export const start = async () /*: Promise<void> */ => {
  const scene = gState().get("scnData").scene;
  // --------------------------------------------------------------
  // ! AUTOMODE
  // --------------------------------------------------------------
  // Trying to stop the duplication of the animation arising from
  // subsequent touch events.
  const started = gState().get("started");
  if (started === true) {
    return;
  } else {
    gState().set("started", true);
  }
  if (!gSttngs().get("autoMode")) {
    hideReticule();
    const controller = gState().get("scnData").controller;
    controller.removeEventListener("select", start);
  }
  // const steps = gSttngs().get("steps");
  // const flwMpSteps = getFlwMpSteps();
  // if (steps.length !== flwMpSteps.length) {
  // }

  createClickCubeGroup();
  orientEverythingToTheClickCube();
  setStartPosition();
  setEndPosition();
  await createValueSphere();
  const ambientLight = ambientLightSetup();
  scene.add(ambientLight);
  const directionalLight = directionalLightSetup();
  directionalLight.target = gState().get("vSphere");
  scene.add(directionalLight);
  populateStepsOnStart();
  // Start the cubes flying
  click();
};
export default start;
