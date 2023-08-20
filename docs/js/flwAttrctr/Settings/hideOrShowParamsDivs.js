// @flow
//------------------------------------------------------------------
// FUNCTION: hideOrShowSettingsDiv()
//------------------------------------------------------------------
export default (paramsToggle /*: boolean */) /*: () => void */ =>
  () /*: void */ => {
    const paramsContainer = document.getElementById("params-container");
    const paramsIcon = document.getElementById("params-icon");
    const settingsIcon = document.getElementById("settings-icon");
    const shareIcon = document.getElementById("share-icon");
    const linkedinIcon = document.getElementById("linkedin-icon");
    const paramsCloseIcon = document.getElementById("params-close-icon");
    if (
      paramsContainer !== null &&
      paramsIcon !== null &&
      settingsIcon !== null &&
      shareIcon !== null &&
      linkedinIcon !== null &&
      paramsCloseIcon !== null
    ) {
      if (paramsToggle === true) {
        paramsContainer.style.display = "block";
        paramsIcon.style.display = "none";
        settingsIcon.style.display = "none";
        shareIcon.style.display = "none";
        linkedinIcon.style.display = "none";
        paramsCloseIcon.style.display = "block";
      } else {
        paramsContainer.style.display = "none";
        paramsIcon.style.display = "block";
        settingsIcon.style.display = "block";
        shareIcon.style.display = "block";
        linkedinIcon.style.display = "block";
        paramsCloseIcon.style.display = "none";
      }
    }
  };
