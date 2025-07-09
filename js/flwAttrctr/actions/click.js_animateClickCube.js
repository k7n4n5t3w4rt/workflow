// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import anime from "animejs";
import { onClickComplete } from "./click";
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
