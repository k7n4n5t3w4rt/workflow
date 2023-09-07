// @flow
//------------------------------------------------------------------
// FUNCTION: hideOrShowSettingsDiv()
//------------------------------------------------------------------
export default (settingsToggle /*: boolean */) /*: () => void */ =>
  () /*: void */ => {
    const settingsContainer = document.getElementById("settings-container");
    const settingsIcon = document.getElementById("settings-icon");
    const configIcon = document.getElementById("config-icon");
    const paramsIcon = document.getElementById("params-icon");
    const shareIcon = document.getElementById("share-icon");
    const linkedinIcon = document.getElementById("linkedin-icon");
    const settingsCloseIcon = document.getElementById("settings-close-icon");
    if (
      settingsContainer !== null &&
      settingsIcon !== null &&
      configIcon !== null &&
      paramsIcon !== null &&
      shareIcon !== null &&
      linkedinIcon !== null &&
      settingsCloseIcon !== null
    ) {
      if (settingsToggle === true) {
        settingsContainer.style.display = "block";
        settingsIcon.style.display = "none";
        configIcon.style.display = "none";
        paramsIcon.style.display = "none";
        shareIcon.style.display = "none";
        linkedinIcon.style.display = "none";
        settingsCloseIcon.style.display = "block";
      } else {
        settingsContainer.style.display = "none";
        settingsIcon.style.display = "block";
        configIcon.style.display = "block";
        paramsIcon.style.display = "block";
        shareIcon.style.display = "block";
        linkedinIcon.style.display = "block";
        settingsCloseIcon.style.display = "none";
      }
    }
  };
