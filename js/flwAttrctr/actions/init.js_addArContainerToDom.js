// @flow
// Refer to copilot.md for TDD rules.
//------------------------------------------------------------------
// addArContainerToDom()
//------------------------------------------------------------------
const addArContainerToDom = () /*: HTMLDivElement */ => {
  // The AR container is where the AR scene will be rendered
  const ARContainer = document.createElement("div");
  // Give it an id
  ARContainer.id = "ar-container";
  const flw = document.getElementById("flw");
  // Flow doesn't know about the DOM so we make sure it isn't null
  if (flw !== null) {
    flw.appendChild(ARContainer);
  } else {
    console.error('There is no <div> with id "flw".');
  }
  return ARContainer;
};

export default addArContainerToDom;
