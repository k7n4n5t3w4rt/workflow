// @flow
//------------------------------------------------------------------
// FUNCTION: hideLandingPageElementsShowSceneElements()
//------------------------------------------------------------------
const hideLandingPageElementsShowSceneElements = () /*: void */ => {
  const configIcon = document.getElementById("config-icon");
  const linkedinIcon = document.getElementById("linkedin-icon");
  const paramsIcon = document.getElementById("params-icon");
  const controlsIcon = document.getElementById("controls-icon");
  const startButton = document.getElementById("start-button");
  const homeIcon = document.getElementById("home-icon");

  if (configIcon) configIcon.style.display = "none";
  if (linkedinIcon) linkedinIcon.style.display = "none";
  if (startButton) startButton.style.display = "none";
  if (paramsIcon) paramsIcon.style.display = "block";
  if (controlsIcon) controlsIcon.style.display = "block";
  if (homeIcon) homeIcon.style.display = "block";
};
export default hideLandingPageElementsShowSceneElements;
