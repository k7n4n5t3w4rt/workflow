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
import populateStepsOnStart from "./populateStepsOnStart.js";
import ambientLightSetup from "./ambientLightSetup.js";
import directionalLightSetup from "./directionalLightSetup.js";
import createValueSphere from "./createValueSphere.js";
import setEndPosition from "./setEndPosition.js";
import setStartPosition from "./setStartPosition.js";
import orientEverythingToTheClickCube from "./orientEverythingToTheClickCube.js";
import createClickCubeGroup from "./createClickCubeGroup.js";
import hideReticule from "./hideReticule.js";
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
  // Start the clubes flying
  click();
};
export default start;
