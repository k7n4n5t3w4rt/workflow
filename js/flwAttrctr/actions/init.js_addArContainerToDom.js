// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// addArContainerToDom()
//------------------------------------------------------------------

const addArContainerToDom = () /*: HTMLElement */ => {
  // Try to find an existing AR container
  let ARContainer = document.getElementById("ar-container");
  if (ARContainer) {
    return ARContainer;
  }
  // Otherwise, create it
  ARContainer = document.createElement("div");
  ARContainer.id = "ar-container";
  const flw = document.getElementById("flw");
  if (flw !== null) {
    flw.appendChild(ARContainer);
  } else {
    console.error('There is no <div> with id "flw".');
  }
  return ARContainer;
};

export default addArContainerToDom;
