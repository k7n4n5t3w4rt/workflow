// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSettings from "./gSettings.js";
import gState from "./gState.js";

export default () /*: Object */ => {
  // spheres in a group can be rotated / scaled etc as a group
  // const clicksphereGroup = new THREE.Group();

  const cellColour = 255;
  const geometry = new THREE.SphereGeometry(0, 0, 0);

  const material = new THREE.MeshBasicMaterial({
    color: `rgb(${cellColour},${cellColour},${cellColour})`,
  });
  const sphere = new THREE.Mesh(geometry, material);

  sphere.position.x = 0;
  sphere.position.y = 0;
  sphere.position.z =
    gSettings().stepCm * gSettings().workflowStatuses.length +
    gSettings().stepCm;
  sphere.castShadow = true;
  return sphere;
};
