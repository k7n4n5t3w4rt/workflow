// @flow
//------------------------------------------------------------------
// FUNCTION: hideOrShowConfigDiv()
//------------------------------------------------------------------
import updateStartButtonText from "../actions/updateStartButtonText.js";

export default (configToggle /*: boolean */) /*: () => void */ =>
  () /*: void */ => {
    const configContainer = document.getElementById("config-container");
    const configIcon = document.getElementById("config-icon");
    const configCloseIcon = document.getElementById("config-close-icon");
    const paramsIcon = document.getElementById("params-icon");
    const shareIcon = document.getElementById("share-icon");
    const controlsIcon = document.getElementById("controls-icon");
    const linkedinIcon = document.getElementById("linkedin-icon");
    const homeIcon = document.getElementById("home-icon");
    const displayName = document.getElementById("display-name");

    if (configToggle === true) {
      if (configContainer) configContainer.style.display = "block";
      if (configIcon) configIcon.style.display = "none";
      if (configCloseIcon) configCloseIcon.style.display = "block";
      if (paramsIcon) paramsIcon.style.display = "none";
      if (shareIcon) shareIcon.style.display = "none";
      if (controlsIcon) controlsIcon.style.display = "none";
      if (linkedinIcon) linkedinIcon.style.display = "none";
      // if (homeIcon) homeIcon.style.display = "none";
      if (displayName) displayName.style.display = "none";
    } else {
      if (configIcon) configIcon.style.display = "block";
      if (shareIcon) shareIcon.style.display = "block";
      if (linkedinIcon) linkedinIcon.style.display = "block";
      if (displayName) displayName.style.display = "block";
      if (configContainer) configContainer.style.display = "none";
      if (configCloseIcon) configCloseIcon.style.display = "none";
      if (paramsIcon) paramsIcon.style.display = "none";
      if (controlsIcon) controlsIcon.style.display = "none";
      // if (homeIcon) homeIcon.style.display = "none";
      // Update the start button text
      updateStartButtonText();
    }
  };
