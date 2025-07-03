// @flow
//------------------------------------------------------------------
// FUNCTION: showParamsIcon()
//------------------------------------------------------------------
export const showParamsIcon = () /*: void */ => {
  const paramsIcon = document.getElementById("params-icon");
  if (paramsIcon !== null) {
    paramsIcon.style.display = "block";
  }
};
export default showParamsIcon;
