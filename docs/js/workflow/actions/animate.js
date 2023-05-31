// @flow
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import gSettings from "./gSettings.js";
import gState from "./gState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import render from "./render.js";

export default () /*: void  */ => {
  const sceneData = gState().sceneData;

  sceneData.renderer.setAnimationLoop(render());
};
