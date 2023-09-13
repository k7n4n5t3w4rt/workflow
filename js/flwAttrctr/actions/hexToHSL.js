// @flow
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// hexToHSL(hex)
//------------------------------------------------------------------
export const hexToHSL = (
  hex /*: string */,
) /*: { h:number, s:number, l:number }*/ => {
  const color = new THREE.Color(hex);
  const hsl = {};
  color.getHSL(hsl);
  return hsl;
};
export default hexToHSL;
