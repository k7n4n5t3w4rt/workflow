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
import Params from "./ThreeBubbleSortParams.js";
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

setSeed(seedString("bubblesort"));

const [styles] = createStyles({
  bubbleSort: {
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
	cols: string,
	rows: string,
	speed: string,
	xcm: string,
	ycm: string,
	zcm: string,
}
*/
export default (props /*: Props */) /*: string */ => {
  // Set some defaults for missing props
  const speed = Math.abs(parseFloat(props.speed) || 1);
  const xCm = Math.abs(Math.floor(parseFloat(props.xcm)) || 10);
  const yCm = Math.abs(Math.floor(parseFloat(props.ycm)) || 10);
  const zCm = Math.abs(Math.floor(parseFloat(props.zcm)) || 10);

  // Just set it for now, if it isn't already set. In move.js, we get it directly
  if (globalSettings().speed === undefined) {
    globalSettings("speed", speed);
    globalSettings("click", 1000 / speed);
  }

  const [state /*: AppState */, dispatch] = useReducer(AppReducer, {
    speed,
    xCm,
    yCm,
    zCm,
  });

  useEffect(() => {
    // setupMobileDebug();
    let stats = createStats();
    init(xCm, yCm, zCm);
  }, []);

  return html`
    <div id="bubble-sort" className="${styles.bubbleSort}">
      <div id="dom-overlay">
        <div id="console-ui"></div>
        <${Params} speed="${state.speed}" dispatch="${dispatch}" />
      </div>
    </div>
  `;
};
