// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import clckCbGroup from "./newClickCube.js";
import click from "./click.js";
import newVSphere from "./newVSphere.js";
import populateSteps from "./populateSteps.js";

export default () /*: void */ => {
  // --------------------------------------------------------------
  // ! AUTOMODE
  // --------------------------------------------------------------
  if (!gSttngs().get("autoMode")) {
    hideReticule();
  }
  createClickCube();
  orientEverythingToTheClickCube();
  setStartPosition();
  setEndPosition();
  createValueSphere();
  populateSteps();
  // Start the clubes flying
  click();
};

//------------------------------------------------------------------
// hideReticule()
//------------------------------------------------------------------
const hideReticule = () /*: void */ => {
  // Hide the reticle
  if (gState().get("scnData").reticleStuff.reticle.visible) {
    gState().get("scnData").reticleStuff.active = false;
  }
};
//------------------------------------------------------------------
// createClickCube()
//------------------------------------------------------------------
const createClickCube = () /*: void */ => {
  gState().get("set")("clckCbGroup", clckCbGroup());
  // --------------------------------------------------------------
  // AUTOMODE
  // --------------------------------------------------------------
  if (gSttngs().get("autoMode")) {
    gState().get("clckCbGroup").clckCube.position.z +=
      gSttngs().get("step") * gSttngs().get("steps").length + 15;
    gState().get("clckCbGroup").position.y -= gSttngs().get("yOffset");
  }
  gState().get("scnData").scene.add(gState().get("clckCbGroup"));
};
//------------------------------------------------------------------
// orientEverythingToTheClickCube()
//------------------------------------------------------------------
const orientEverythingToTheClickCube = () /*: void */ => {
  // Get the direction in which the camera is looking
  const vector = new THREE.Vector3();
  gState().get("scnData").camera.getWorldDirection(vector);
  const radians = Math.atan2(vector.x, vector.z);
  // Rotate the group on the Y axis (around it's centre, always the 0,0,0 point)
  gState().get("clckCbGroup").rotateY(radians);
  // --------------------------------------------------------------
  // ! AUTOMODE
  // --------------------------------------------------------------
  if (!gSttngs().get("autoMode")) {
    // Last thing: set the position of the cube based on the location of  the reticle
    gState()
      .get("clckCbGroup")
      .position.setFromMatrixPosition(
        gState().get("scnData").reticleStuff.reticle.matrix,
      );
  }
};
//------------------------------------------------------------------
// setStartPosition()
//------------------------------------------------------------------
const setStartPosition = () /*: void */ => {
  // Set the start position for all the flw items
  // based on where we put the cube, but higher up
  gState().get("set")(
    "strtPosition",
    gState().get("clckCbGroup").clckCube.position.clone(),
  );
  gState().get("strtPosition").y = gSttngs().get("yOffset");
};
//------------------------------------------------------------------
// setEndPosition()
//------------------------------------------------------------------
const setEndPosition = () /*: void */ => {
  gState().get("set")("endPosition", gState().get("strtPosition").clone());
  gState().get("endPosition").z +=
    gSttngs().get("step") * (gSttngs().get("steps").length + 1) * -1;
  // --------------------------------------------------------------
  // AUTOMODE
  // --------------------------------------------------------------
  if (gSttngs().get("autoMode")) {
    gState().get("endPosition").z -=
      gSttngs().get("step") * gSttngs().get("steps").length + 2;
  }
};
//------------------------------------------------------------------
// createValueSphere()
//------------------------------------------------------------------
const createValueSphere = () /*: void */ => {
  // Create the valueSphere
  gState().get("set")("vSphere", newVSphere());
  gState().get("vSphere").dRllngTtlVolume = 0;
  gState().get("vSphere").dRadius = 0;
  gState().get("vSphere").position.x = 0;
  gState().get("vSphere").position.y = gState().get("endPosition").y;
  gState().get("vSphere").position.z = gState().get("endPosition").z;
  gState().get("vSphere").dPosition.x = 0;
  gState().get("vSphere").dPosition.y = gState().get("endPosition").y;
  gState().get("vSphere").dPosition.z = gState().get("endPosition").z;
  gState().get("clckCbGroup").add(gState().get("vSphere"));
};
