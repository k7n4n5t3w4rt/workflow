// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./flwAttrctr/actions/gSttngs.js";
import gState from "./flwAttrctr/actions/gState.js";
import globalSettings from "./flwAttrctr/actions/globalSettings.js";
import globalStepSettings from "./flwAttrctr/actions/globalStepSettings.js";
import globalState from "./flwAttrctr/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getSttngsFromEasyStorage from "./flwAttrctr/actions/getSttngsFromEasyStorage.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { h, hydrate, render } from "../web_modules/preact.js";
import App from "./App.js";
import { html } from "../web_modules/htm/preact.js";
//------------------------------------------------------------------
// MAIN
//------------------------------------------------------------------
// First, load the global settings and state. Note that `globalSettings()`
// is an async funnction. The value of `gSttngs()` properties will be
// updated after they are first set with the defaults, based on
// calls to Easy, the backend keystore.
globalSettings().then(() => {
  globalStepSettings();
  globalState();
  if (gSttngs().get("easyStorage") === true) {
    setInterval(getSttngsFromEasyStorage, 1000);
  }
});
render(html` <${App} /> `, document.getElementById("goodthing"));
