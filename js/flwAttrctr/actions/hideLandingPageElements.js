// @flow
//------------------------------------------------------------------
// FUNCTION: hideLandingPageElements()
//------------------------------------------------------------------
const hideLandingPageElements = () /*: void */ => {
  const configIcon = document.getElementById("config-icon");
  const linkedinIcon = document.getElementById("linkedin-icon");
  const settingsIcon = document.getElementById("settings-icon");
  const paramsIcon = document.getElementById("params-icon");
  const controlsIcon = document.getElementById("controls-icon");
  if (
    paramsIcon !== null &&
    settingsIcon !== null &&
    configIcon !== null &&
    controlsIcon !== null &&
    linkedinIcon !== null
  ) {
    configIcon.style.display = "none";
    linkedinIcon.style.display = "none";
    settingsIcon.style.display = "block";
    paramsIcon.style.display = "block";
    controlsIcon.style.display = "block";
  }
};
export default hideLandingPageElements;
