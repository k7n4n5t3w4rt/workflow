// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../web_modules/three.js";
import Stats from "../../web_modules/three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import { TGALoader } from "../../web_modules/three/examples/jsm/loaders/TGALoader.js";
// --------------------------------------------------
// PREACT
// --------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
// --------------------------------------------------
// COMPONENTS
// --------------------------------------------------
import Params from "./WorkflowParams.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
// import setupMobileDebug from "../setup_mobile_debug.js";
import AppReducer from "../appReducer.js";
import createStats from "../create_stats.js";
import init from "./actions/init.js";
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";
import gSttngs from "./actions/gSttngs.js";
import gState from "./actions/gState.js";
import globalSettings from "./actions/globalSettings.js";

/*::
type Props = {
	fps: string,
	scalecm: string,
	stepcm: string,
  teamsnumber: string,
  teamsize: string
}
*/
export default (props /*: Props */) /*: string */ => {
  const styles = cssStyles();
  globalSettings(props);
  // I'm not really using the state, but leaving it here
  // for when we're setting properties on the fly.
  const [state /*: AppState */, dispatch] = useReducer(AppReducer, {
    fps: gSttngs().fps,
  });

  useEffect(() => {
    // setupMobileDebug();
    let stats = createStats();
    init();
  }, []);

  return html`
    <div id="flw" className="${styles.flw}">
      <div id="dom-overlay">
        <div id="console-ui"></div>
        <${Params} fps="${state.fps}" dispatch="${dispatch}" />
      </div>
    </div>
  `;
};

// --------------------------------------------------
// cssStyles()
// --------------------------------------------------
const cssStyles = () /*: Object */ => {
  // A seed for getting unique class names
  setSeed(seedString("flw"));

  const [styles] = createStyles({
    flw: {
      width: "100%",
      height: "100%",
      backgroundImage: "url(/img/bg1.png)",
      backgroundClip: "border-box",
      backgroundSize: "cover",
      backgroundRepeat: "none",
      position: "absolute",
    },
  });
  return styles;
};
