// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import globalSettings from "./globalSettings.js";
// import pixelGridGroup from "./pixelGridGroup";
import pixelGridGroupAddCube from "./pixelGridGroupAddCube.js";

const click = (
  clickCube /*: Object */,
  pixelGridGroup /*: Object */,
  anime /*: function */,
) /*: boolean */ => {
  // NOTE:
  // This might not be very clear so:
  //
  // cubes is an an array of columns of cubes.
  // Each cube object is a REFERENCE to a THREE.js Mesh object that
  // was atached to the THREE.js scene in:
  //
  //		/js/workflow/actions/pixelGrid.js (Line 34)
  //
  const speed = globalSettings().speed;

  // Move cube1
  anime({
    targets: [clickCube.rotation],
    y: clickCube.rotation.y + Math.PI / 2,
    duration: 1000,
    easing: "easeInOutSine",
    complete: function (anim) {
      console.log("Click complete.");
      click(clickCube, pixelGridGroup, anime);
      // Move the next cube...
      pixelGridGroupAddCube(pixelGridGroup);
    },
  });
  return true;
};

export default click;
