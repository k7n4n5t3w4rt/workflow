// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// setInstanceColor()
//------------------------------------------------------------------
// Helper function to set instance color
export const setInstanceColor = (
  index /*: number */,
  colorCode /*: string */,
) /*: void */ => {
  const instncdCbMesh = gState().get("instncdCbMesh");
  // Ensure colorValue is a THREE.Color object
  const color =
    colorCode instanceof THREE.Color ? colorCode : new THREE.Color(colorCode);

  instncdCbMesh.setColorAt(index, color);
  instncdCbMesh.instanceColor.needsUpdate = true; // notify three.js that colors have changed
};
export default setInstanceColor;
