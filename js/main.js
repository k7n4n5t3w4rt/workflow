// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./flwAttrctr/actions/gSttngs.js";
import gState from "./flwAttrctr/actions/gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getSttngsFromEasyStorage from "./flwAttrctr/actions/getSttngsFromEasyStorage.js";
import globalSettings from "./flwAttrctr/actions/globalSettings.js";
import globalStepSettings from "./flwAttrctr/actions/main.js_globalStepSettings.js";
import globalState from "./flwAttrctr/actions/globalState.js";
import globalParamsSettings from "./flwAttrctr/actions/globalParamsSettings.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { h, hydrate, render } from "preact";
import App from "./App.js";
import { html } from "htm/preact";
//------------------------------------------------------------------
// MAIN
//------------------------------------------------------------------
// First, load the global settings and state. Note that `globalSettings()`
// is an async funnction. The value of `gSttngs()` properties will be
// updated after they are first set with the defaults, based on
// calls to Easy, the backend keystore.
globalSettings().then(() /*: void */ => {
  // Initialise the global Steps settings
  globalStepSettings();
  // The Params settings define which parameters are editable by the user
  globalParamsSettings();
  // Initialise the global state
  globalState();
  // If we are using Easy, then we need to update the global settings
  // every second as they may be set by another user.
  if (gSttngs().get("easyStorage") === true) {
    setInterval(getSttngsFromEasyStorage, 1000);
  }
  // Only when the global settings and state are loaded and initialised
  // do we render the app.
  render(html` <${App} /> `, document.getElementById("goodthing"));
});
