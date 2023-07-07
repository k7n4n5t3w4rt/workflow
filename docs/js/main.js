// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import globalSettings from "./workflow/actions/globalSettings.js";
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

globalSettings();
globalState();
// getSttngsFromEasyStorage();
render(html` <${App} /> `, document.getElementById("goodthing"));
