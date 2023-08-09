// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// share()
//------------------------------------------------------------------
const share = async () /*: Promise<void> */ => {
  const shareSettings = { ...gSttngs().keyValuePairs };
  delete shareSettings.autoMode;
  delete shareSettings.easyStorage;
  delete shareSettings.fps;
  const gSttngsString = JSON.stringify(shareSettings);
  const sid = gSttngs().sid;
  const protocol = window.location.protocol; // e.g., "http:"
  const hostname = window.location.hostname; // e.g., "www.example.com"
  const port = window.location.port; // e.g., "8080"
  const urlToShare = `${protocol}://${hostname}:${port}/?sid=${sid}&share=${btoa(
    gSttngsString,
  )}`;
  try {
    await navigator.clipboard.writeText(urlToShare);
    alert("The URL has been copied to your clipboard: " + urlToShare);
  } catch (err) {
    /*:: if (!(err instanceof Error)) throw new Error("Unexpected error type"); */
    console.error("Failed to copy URL to clipboard", err);
  }
};
export default share;
