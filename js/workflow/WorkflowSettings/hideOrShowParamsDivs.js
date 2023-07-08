// @flow
//------------------------------------------------------------------
// FUNCTION: hideOrShowSettingsDiv()
//------------------------------------------------------------------
export default (paramsToggle /*: boolean */) /*: () => void */ =>
  () /*: void */ => {
    const paramsContainer = document.getElementById("params-container");
    const paramsIcon = document.getElementById("params-icon");
    const paramsCloseIcon = document.getElementById("params-close-icon");
    if (
      paramsContainer !== null &&
      paramsIcon !== null &&
      paramsCloseIcon !== null
    ) {
      if (paramsToggle === true) {
        paramsContainer.style.display = "block";
        paramsIcon.style.display = "none";
        paramsCloseIcon.style.display = "block";
      } else {
        paramsContainer.style.display = "none";
        paramsIcon.style.display = "block";
        paramsCloseIcon.style.display = "none";
      }
    }
  };
