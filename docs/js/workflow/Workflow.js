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
import AppReducer from "../appReducer.js";
import setupMobileDebug from "../setup_mobile_debug.js";
import createStats from "../create_stats.js";
import init from "./actions/init.js";
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";
import globalSettings from "./actions/globalSettings.js";
import globalState from "./actions/globalState.js";

setSeed(seedString("workflow"));

const [styles] = createStyles({
  workflow: {
    width: "100%",
    height: "100%",
    backgroundImage: "url(/img/bg1.png)",
    backgroundClip: "border-box",
    backgroundSize: "cover",
    backgroundRepeat: "none",
    position: "absolute",
  },
});

/*::
type Props = {
	speed: string,
	xcm: string,
	ycm: string,
	zcm: string,
}
*/
export default (props /*: Props */) /*: string */ => {
  // Set some defaults for missing props
  globalSettings("speed", Math.abs(parseFloat(props.speed) || 1));
  // The default will be 0.1 == 10cm
  globalSettings(
    "xCm",
    Math.abs(Math.floor(parseFloat(props.xcm)) / 100 || 0.1),
  );
  globalSettings(
    "yCm",
    Math.abs(Math.floor(parseFloat(props.ycm)) / 100 || 0.1),
  );
  globalSettings(
    "zCm",
    Math.abs(Math.floor(parseFloat(props.zcm)) / 100 || 0.1),
  );

  // I'm not really using the state, but leaving it here just in case
  const [state /*: AppState */, dispatch] = useReducer(AppReducer, {
    speed: globalSettings().speed,
  });

  useEffect(() => {
    // setupMobileDebug();
    let stats = createStats();
    init();
  }, []);

  return html`
    <div id="workflow" className="${styles.workflow}">
      <div id="dom-overlay">
        <div id="console-ui"></div>
        <${Params} speed="${state.speed}" dispatch="${dispatch}" />
      </div>
    </div>
  `;
};
