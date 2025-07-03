// @flow
//------------------------------------------------------------------
// FUNCTION: hideOrShowSettingsDiv()
//------------------------------------------------------------------
export default (paramsToggle /*: boolean */) /*: () => void */ =>
  () /*: void */ => {
    const paramsContainer = document.getElementById("params-container");
    const paramsIcon = document.getElementById("params-icon");
    const paramsCloseIcon = document.getElementById("params-close-icon");
    const configIcon = document.getElementById("config-icon");
    const shareIcon = document.getElementById("share-icon");
    const controlsIcon = document.getElementById("controls-icon");
    const linkedinIcon = document.getElementById("linkedin-icon");
    const homeIcon = document.getElementById("home-icon");
    const displayName = document.getElementById("display-name");

    if (paramsToggle === true) {
      if (paramsContainer) paramsContainer.style.display = "block";
      if (paramsIcon) paramsIcon.style.display = "none";
      if (paramsCloseIcon) paramsCloseIcon.style.display = "block";
      if (configIcon) configIcon.style.display = "none";
      if (shareIcon) shareIcon.style.display = "none";
      if (controlsIcon) controlsIcon.style.display = "none";
      if (linkedinIcon) linkedinIcon.style.display = "none";
      if (homeIcon) homeIcon.style.display = "none";
      if (displayName) displayName.style.display = "none";
    } else {
      if (paramsContainer) paramsContainer.style.display = "none";
      if (paramsCloseIcon) paramsCloseIcon.style.display = "none";
      if (paramsIcon) paramsIcon.style.display = "block";
      if (shareIcon) shareIcon.style.display = "block";
      if (controlsIcon) controlsIcon.style.display = "block";
      if (homeIcon) homeIcon.style.display = "block";
      // if (configIcon) configIcon.style.display = "block";
      // if (linkedinIcon) linkedinIcon.style.display = "block";
      // if (displayName) displayName.style.display = "block";
    }
  };
