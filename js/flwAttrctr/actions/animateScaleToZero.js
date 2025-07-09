// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import anime from "animejs";

//------------------------------------------------------------------
// animateScaleToZero()
//------------------------------------------------------------------
export default (
  flwItem /*: FlwItem */,
  duration /*: number */ = 1200,
  completeFunction /*: function */ = () => {},
) /*: void */ => {
  // Create an object with a scale property that can be animated.
  let scaleObject = {
    x: flwItem.scale.x,
    y: flwItem.scale.y,
    z: flwItem.scale.z,
  };

  flwItem.dMoving = true;

  // Create an animation that transitions the scale from 1.0 to 2.0 over 2 seconds.
  anime({
    targets: [scaleObject],
    x: 0,
    y: 0,
    z: 0,
    duration: duration,
    easing: "linear",
    // Update the sphere's scale on each frame.
    update: function () {
      flwItem.scale.set(scaleObject.x, scaleObject.y, scaleObject.z);
    },
    complete: completeFunction,
  });
};
