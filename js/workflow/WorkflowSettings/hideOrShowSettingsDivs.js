//------------------------------------------------------------------
// hideOrShowSettingsDiv()
//------------------------------------------------------------------
export const hideOrShowSettingsDivs = (settingsToggle /*: boolean */) => () => {
  const settingsContainer = document.getElementById("settings-container");
  const settingsIcon = document.getElementById("settings-icon");
  const settingsCloseIcon = document.getElementById("settings-close-icon");
  if (
    settingsContainer !== null &&
    settingsIcon !== null &&
    settingsCloseIcon !== null
  ) {
    if (settingsToggle === true) {
      settingsContainer.style.display = "block";
      settingsIcon.style.display = "none";
      settingsCloseIcon.style.display = "block";
    } else {
      settingsContainer.style.display = "none";
      settingsIcon.style.display = "block";
      settingsCloseIcon.style.display = "none";
    }
  }
};
