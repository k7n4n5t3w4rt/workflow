// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./gState";
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// IMPORT: THREE.js
//------------------------------------------------------------------
import * as THREE from "three";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import start from "./start";
import reset from "./reset";
import hideLandingPageElementsShowSceneElements from "./hideLandingPageElementsShowSceneElements";

const createButton = (
  renderer /*: function */,
  sessionInit /*: Object */ = {},
) /*: void | HTMLAnchorElement | HTMLButtonElement */ => {
  const existingButton = document.getElementById("ARButton");
  if (existingButton !== null) {
    existingButton.remove();
  }
  let currentSession = null;

  const button = document.createElement("button");

  function showStartAR(/*device*/) {
    // Show the "START" button
    button.style.display = "block";
    button.textContent = gSttngs().get("displayName") || "START";
    // Desktop behaviour
    button.onmouseenter = function () {
      button.style.opacity = "1.0";
    };
    button.onmouseleave = function () {
      button.style.opacity = "0.5";
    };
    // Start the AR session when the button is clicked
    button.onclick = function () {
      if (currentSession === null) {
        if ("xr" in navigator) {
          hideLandingPageElementsShowSceneElements();
          // $FlowFixMe
          navigator.xr
            .requestSession("immersive-ar", sessionInit)
            .then(onSessionStarted);
        }
      } else {
        if (button.textContent === "REPLACE") {
          // button.textContent = "RELOAD";
          //------------------------------------------------------------------
          // // Do we really want to kill the cubes?
          const scnData = gState().get("scnData");
          const scene = scnData.scene;
          const clckCbGroup = gState().get("clckCbGroup");
          // Remove the clickCube;
          // const clckCube = clckCbGroup.children[0];
          const clckCube = clckCbGroup.clckCube;
          clckCbGroup.remove(clckCube);
          if (clckCube instanceof THREE.Mesh) {
            clckCube.material.dispose();
            clckCube.geometry.dispose();
          }
          //------------------------------------------------------------------
          // renderer.clear();
          // Show the reticule
          const reticleStuff = gState().get("scnData").reticleStuff;
          reticleStuff.active = true;
          reticleStuff.reticle.visible = true;
          reticleStuff.hitTestSourceInitialized = false;
          reticleStuff.hitTestSource = null;
          const controller = gState().get("scnData").controller;
          // // Clear the global state
          // globalState();
          // // Put back the scene data
          // gState().set("scnData", scnData);
          // gState().set("clckCbGroup", clckCbGroup);
          // Put in some delay so that it doesn't capture the current touch
          setTimeout(() => {
            controller.addEventListener("select", reset);
          }, 1000);
          // Change the "started" state to false
          gState().set("started", false);
        } else {
          currentSession.end();
        }
      }
    };

    async function onSessionStarted(session) {
      session.addEventListener("end", onSessionEnded);

      if ("xr" in navigator) {
        renderer.xr.setReferenceSpaceType("local");
        await renderer.xr.setSession(session);
        // --------------------------------------------------------------
        // AUTOMODE
        // --------------------------------------------------------------
        if (gSttngs().get("autoMode")) {
          start();
        }
        button.textContent = "REPLACE";
        stylizeReplaceButton(button);
        currentSession = session;
      }
    }

    function onSessionEnded(/*event*/) {
      if (currentSession !== null) {
        currentSession.removeEventListener("end", onSessionEnded);
        // button.textContent = "START AR";
        // currentSession = null;
        window.location.assign(`/`);
      }
    }
  }

  function stylizeReplaceButton(element) {
    element.style.padding = "12px 24px";
    element.style.border = "1px solid #fff";
    element.style.borderRadius = "4px";
    element.style.background = "rgba(0, 0, 0, 0.1)";
    element.style.color = "#fff";
    element.style.font = "normal 13px sans-serif";
    element.style.opacity = "0.5";
    element.style.outline = "none";
  }

  function disableButton() {
    button.style.display = "";

    button.style.cursor = "auto";
    button.style.left = "calc(50% - 75px)";
    button.style.width = "150px";

    button.onmouseenter = null;
    button.onmouseleave = null;

    button.onclick = null;
  }

  function showARNotSupported() {
    disableButton();

    button.textContent = "AR NOT SUPPORTED";
  }

  function stylizeElement(element) {
    element.style.position = "absolute";
    button.style.cursor = "pointer";
    button.style.left = "50%";
    button.style.transform = "translateX(-50%)";
    element.style.bottom = "24px";
    element.style.padding = "20px 40px";
    element.style.border = "none";
    element.style.borderRadius = "8px";
    element.style.background = "#4CAF50";
    element.style.color = "#fff";
    element.style.font = "bold 20px sans-serif";
    element.style.textAlign = "center";
    element.style.opacity = "1";
    element.style.outline = "1px solid white";
    element.style.zIndex = "10000";
  }

  if ("xr" in navigator) {
    button.id = "ARButton";
    button.style.display = "none";

    stylizeElement(button);

    // $FlowFixMe
    navigator.xr
      .isSessionSupported("immersive-ar")
      .then(function (supported) {
        supported ? showStartAR() : showARNotSupported();
      })
      .catch(showARNotSupported);

    return button;
  } else {
    const message = document.createElement("a");

    if (window.isSecureContext === false) {
      message.href = document.location.href.replace(/^http:/, "https:");
      message.innerHTML = "WEBXR NEEDS HTTPS"; // TODO Improve message
    } else {
      message.href = "https://immersiveweb.dev/";
      message.innerHTML = "WEBXR NOT AVAILABLE";
    }

    message.style.left = "calc(50% - 90px)";
    message.style.width = "180px";
    message.style.textDecoration = "none";

    stylizeElement(message);

    return message;
  }
};
export default { createButton };

//------------------------------------------------------------------
// FUNCTION: hideOrShowLandingPageElements()
//------------------------------------------------------------------
