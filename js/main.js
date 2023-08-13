// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./workflow/actions/gSttngs.js";
import gState from "./workflow/actions/gState.js";
import globalSettings from "./workflow/actions/globalSettings.js";
import globalStepSettings from "./workflow/actions/globalStepSettings.js";
import globalState from "./workflow/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getSttngsFromEasyStorage from "./workflow/actions/getSttngsFromEasyStorage.js";
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
