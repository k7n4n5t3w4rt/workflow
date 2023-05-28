// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import cube1AnimeOptions from "./cube1AnimeOptions.js";
import cube2AnimeOptions from "./cube2AnimeOptions.js";
import globalSettings from "./globalSettings.js";

const move = (
  cubes /*: Cubes */,
  zCm /*: number */,
  anime /*: function */,
) /*: Cubes */ => {
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
    targets: [cubes.pixelGridGroup.children[0].position],
    x: [
      {
        value: cubes.pixelGridGroup.children[0].position.x,
        duration: 1000 / speed,
        delay: 0,
      },
    ],
    z: [
      {
        value: cubes.pixelGridGroup.children[0].position.z,
        duration: 1000 / speed,
        delay: 0,
      },
    ],
    y: [
      {
        value: cubes.pixelGridGroup.children[0].position.y,
        duration: 1000 / speed,
        delay: 0,
      },
    ],
    delay: 500,
    easing: "easeInOutCirc",
    complete: function (anim) {
      console.log("Move complete.");
      // Move the next cube...
    },
  });
  return cubes;
};

export default move;
