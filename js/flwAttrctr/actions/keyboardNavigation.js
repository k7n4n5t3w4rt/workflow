// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";

//------------------------------------------------------------------
// KEYBOARD NAVIGATION HANDLER
//------------------------------------------------------------------

/*::
type KeyboardState = {
  forward: boolean,
  backward: boolean,
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
export const createKeyboardNavigation = (config /*: NavigationConfig */) /*: { cleanup: () => void, update: () => void } */ => {
  const { moveSpeed, camera, controller } = config;
  
  // Track which keys are currently pressed
  const keyState /*: KeyboardState */ = {
    forward: false,
    backward: false,
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
      case 'ArrowUp':
        keyState.forward = true;
        event.preventDefault();
        break;
      case 'ArrowDown':
        keyState.backward = true;
        event.preventDefault();
        break;
      case 'ArrowLeft':
        keyState.left = true;
        event.preventDefault();
        break;
      case 'ArrowRight':
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
      case 'ArrowUp':
        keyState.forward = false;
        event.preventDefault();
        break;
      case 'ArrowDown':
        keyState.backward = false;
        event.preventDefault();
        break;
      case 'ArrowLeft':
        keyState.left = false;
        event.preventDefault();
        break;
      case 'ArrowRight':
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

    // Calculate camera forward direction (in XZ plane for 2D-like movement)
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0; // Keep movement in horizontal plane
    cameraDirection.normalize();

    // Calculate camera right direction
    cameraRight.crossVectors(cameraDirection, camera.up).normalize();

    // Apply movement based on pressed keys
    if (keyState.forward) {
      moveVector.add(cameraDirection.clone().multiplyScalar(moveSpeed));
    }
    if (keyState.backward) {
      moveVector.add(cameraDirection.clone().multiplyScalar(-moveSpeed));
    }
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
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  // Return cleanup function and update function
  return {
    cleanup: () /*: void */ => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    },
    update: updateMovement
  };
};

