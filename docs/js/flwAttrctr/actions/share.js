// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORTS: HELPERS
//------------------------------------------------------------------
import rndmBetweenIntegers from "./rndmBetweenIntegers.js";
//------------------------------------------------------------------
// FUNCTION: share()
//------------------------------------------------------------------
const share = async () /*: Promise<void> */ => {
  const shareSettings = { ...gSttngs().keyValuePairs };
  delete shareSettings.autoMode;
  delete shareSettings.easyStorage;
  shareSettings.fps = 1;
  shareSettings.flwItmSizeLimit = 1;
  shareSettings.steps = shareSettings.steps.map((step) => {
    step.movingLimit = step.limit;
    step.movingDevUnits = step.devUnits;
    return step;
  });
  const gSttngsString = JSON.stringify(shareSettings);
  const sid = gSttngs().sid;
  const protocol = window.location.protocol; // e.g., "http:"
  const hostname = window.location.hostname; // e.g., "www.example.com"
  const port = window.location.port; // e.g., "8080"
  const sidName = sid.split("___")[0] || sid;
  const urlToShare = `${protocol}//${hostname}:${port}/?sid=${sidName}___${rndmBetweenIntegers(
    1,
    1000000,
  )}&share=${btoa(gSttngsString)}`;
  try {
    await navigator.clipboard.writeText(urlToShare);
    alert("The URL has been copied to your clipboard: " + urlToShare);
  } catch (err) {
    /*:: if (!(err instanceof Error)) throw new Error("Unexpected error type"); */
    console.error("Failed to copy URL to clipboard", err);
  }
};
export default share;
