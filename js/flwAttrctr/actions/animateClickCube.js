// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import anime from "../../../web_modules/animejs.js";
import { onClickComplete } from "./click.js";
//------------------------------------------------------------------
// animateClickCube()
//------------------------------------------------------------------
export default () => {
  // Rotate the clckCube
  anime({
    targets: [gState().get("clckCbGroup").clckCube.rotation],
    y: gState().get("clckCbGroup").clckCube.rotation.y + Math.PI / 2,
    duration: 1000 / gSttngs().get("fps"),
    easing: "easeInOutSine",
    complete: onClickComplete,
  });
};
