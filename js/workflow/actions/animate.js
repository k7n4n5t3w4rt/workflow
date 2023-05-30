// @flow
// --------------------------------------------------
// GLOBALS
// --------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import render from "./render.js";

export default () /*: void  */ => {
  const sceneData = globalState().sceneData;

  sceneData.renderer.setAnimationLoop(render());
};
