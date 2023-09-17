// @flow
//------------------------------------------------------------------
// FUNCTION: hideOrShowConfigDiv()
//------------------------------------------------------------------
export default (configToggle /*: boolean */) /*: () => void */ =>
  () /*: void */ => {
    const configContainer = document.getElementById("config-container");
    const configIcon = document.getElementById("config-icon");
    const settingsIcon = document.getElementById("settings-icon");
    const paramsIcon = document.getElementById("params-icon");
    const shareIcon = document.getElementById("share-icon");
    const linkedinIcon = document.getElementById("linkedin-icon");
    const configCloseIcon = document.getElementById("config-close-icon");
    if (
      configContainer !== null &&
      configIcon !== null &&
      settingsIcon !== null &&
      paramsIcon !== null &&
      shareIcon !== null &&
      linkedinIcon !== null &&
      configCloseIcon !== null
    ) {
      if (configToggle === true) {
        configContainer.style.display = "block";
        configIcon.style.display = "none";
        settingsIcon.style.display = "none";
        paramsIcon.style.display = "none";
        shareIcon.style.display = "none";
        configCloseIcon.style.display = "block";
      } else {
        configContainer.style.display = "none";
        configIcon.style.display = "block";
        settingsIcon.style.display = "block";
        paramsIcon.style.display = "block";
        shareIcon.style.display = "block";
        configCloseIcon.style.display = "none";
      }
    }
  };
