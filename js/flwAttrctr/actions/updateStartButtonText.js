// @flow
import gSttngs from "./gSttngs.js";

export default () => {
  const startButton = document.getElementById("start-button");
  if (startButton) {
    startButton.innerHTML = gSttngs().get("displayName") || "START";
  }
  const arButton = document.getElementById("ARButton");
  if (arButton) {
    arButton.innerHTML = gSttngs().get("displayName") || "START";
  }
};
