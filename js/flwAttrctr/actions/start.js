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
import pointLightsSetup from "./pointLightsSetup.js";
import ambientLightSetup from "./ambientLightSetup.js";
import directionalLightSetup from "./directionalLightSetup.js";
import createValueSphere from "./createValueSphere.js";
import setEndPosition from "./setEndPosition.js";
import setStartPosition from "./setStartPosition.js";
import orientEverythingToTheClickCube from "./orientEverythingToTheClickCube.js";
import createClickCube from "./createClickCube.js";
import hideReticule from "./hideReticule.js";
//------------------------------------------------------------------
// FUNCTION: start()
//------------------------------------------------------------------
export const start = async () /*: Promise<void> */ => {
  const scene = gState().get("scnData").scene;
  // --------------------------------------------------------------
  // ! AUTOMODE
  // --------------------------------------------------------------
  // Trying to stop the duplication of the animation ariseing from
  // subsequent touch events.
  if (gState().get("started") === true) {
    return;
  } else {
    gState().set("started", true);
  }
  if (!gSttngs().get("autoMode")) {
    hideReticule();
  }
  createClickCube();
  orientEverythingToTheClickCube();
  setStartPosition();
  setEndPosition();
  await createValueSphere();
  const ambientLight = ambientLightSetup();
  scene.add(ambientLight);
  // const pointLights = pointLightsSetup();
  // scene.add(pointLights.pointLight1);
  // scene.add(pointLights.pointLight2);
  // scene.add(pointLights.pointLight3);
  // // const hemisphereLight = hemisphereLightSetup();
  // // scene.add(hemisphereLight);
  const directionalLight = directionalLightSetup();
  directionalLight.target = gState().get("vSphere");
  scene.add(directionalLight);
  // directionalLights.directionalLight2.target = gState().get("vSphere");
  // scene.add(directionalLights.directionalLight2);
  // directionalLights.directionalLight3.target = gState().get("vSphere");
  // scene.add(directionalLights.directionalLight3);
  populateSteps();
  // Start the clubes flying
  click();
};
export default start;
