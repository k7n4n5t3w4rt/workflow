// @flow
//------------------------------------------------------------------
// FUNCTION: hideLandingPageElements()
//------------------------------------------------------------------
const hideLandingPageElements = () /*: void */ => {
  const configIcon = document.getElementById("config-icon");
  const linkedinIcon = document.getElementById("linkedin-icon");
  const paramsIcon = document.getElementById("params-icon");
  const controlsIcon = document.getElementById("controls-icon");

  if (configIcon) configIcon.style.display = "none";
  if (linkedinIcon) linkedinIcon.style.display = "none";
  if (paramsIcon) paramsIcon.style.display = "block";
  if (controlsIcon) controlsIcon.style.display = "block";
};
export default hideLandingPageElements;
