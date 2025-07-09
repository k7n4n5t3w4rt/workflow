// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";

//------------------------------------------------------------------
// KEYBOARD NAVIGATION HANDLER
//------------------------------------------------------------------

/*::
type KeyboardState = {
  up: boolean,
  down: boolean,
  left: boolean,
  right: boolean,
};

type NavigationConfig = {
  moveSpeed: number,
  camera: Object,
  controller: Object,
};
*/

/**
 * Creates a keyboard navigation system for 2D camera movement
 * Moves camera relative to its current orientation
 */
export const createKeyboardNavigation = (
  config /*: NavigationConfig */,
) /*: { cleanup: () => void, update: () => void } */ => {
  const { moveSpeed, camera, controller } = config;

  // Track which keys are currently pressed
  const keyState /*: KeyboardState */ = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  // Movement vectors relative to camera orientation
  const moveVector = new THREE.Vector3();
  const cameraDirection = new THREE.Vector3();
  const cameraRight = new THREE.Vector3();

  /**
   * Handle keydown events
   */
  const onKeyDown = (event /*: KeyboardEvent */) /*: void */ => {
    switch (event.code) {
      case "ArrowUp":
        keyState.up = true;
        event.preventDefault();
        break;
      case "ArrowDown":
        keyState.down = true;
        event.preventDefault();
        break;
      case "ArrowLeft":
        keyState.left = true;
        event.preventDefault();
        break;
      case "ArrowRight":
        keyState.right = true;
        event.preventDefault();
        break;
    }
  };

  /**
   * Handle keyup events
   */
  const onKeyUp = (event /*: KeyboardEvent */) /*: void */ => {
    switch (event.code) {
      case "ArrowUp":
        keyState.up = false;
        event.preventDefault();
        break;
      case "ArrowDown":
        keyState.down = false;
        event.preventDefault();
        break;
      case "ArrowLeft":
        keyState.left = false;
        event.preventDefault();
        break;
      case "ArrowRight":
        keyState.right = false;
        event.preventDefault();
        break;
    }
  };

  /**
   * Update camera position based on current key state
   * Called from the render loop
   */
  const updateMovement = () /*: void */ => {
    // Reset movement vector
    moveVector.set(0, 0, 0);

    // Calculate camera right direction for left/right movement
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0; // Keep horizontal direction calculation in XZ plane
    cameraDirection.normalize();
    cameraRight.crossVectors(cameraDirection, camera.up).normalize();

    // Apply movement based on pressed keys
    // Up/Down arrows control vertical movement (Y axis)
    if (keyState.up) {
      moveVector.y += moveSpeed; // Move up
    }
    if (keyState.down) {
      moveVector.y -= moveSpeed; // Move down
    }
    // Left/Right arrows control horizontal movement relative to camera
    if (keyState.left) {
      moveVector.add(cameraRight.clone().multiplyScalar(-moveSpeed));
    }
    if (keyState.right) {
      moveVector.add(cameraRight.clone().multiplyScalar(moveSpeed));
    }

    // Apply movement to camera and orbit controller target
    if (moveVector.length() > 0) {
      camera.position.add(moveVector);
      controller.target.add(moveVector);
      controller.update();
    }
  };

  // Add event listeners
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  // Return cleanup function and update function
  return {
    cleanup: () /*: void */ => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    },
    update: updateMovement,
  };
};
