// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./actions/gSttngs.js";
import gState from "./actions/gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../web_modules/three.js";
import Stats from "../../web_modules/three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "../../web_modules/three/examples/jsm/controls/OrbitControls.js";
import { TGALoader } from "../../web_modules/three/examples/jsm/loaders/TGALoader.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// COMPONENTS
//------------------------------------------------------------------
import Metrics from "./WorkflowMetrics.js";
import Settings from "./WorkflowSettings/index.js";
import Params from "./WorkflowParams.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
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

/*::
type Props = {
	fps?: string,
	scalecm?: string,
	stepcm?: string,
  devunits?: string,
  devstreams?: string,
}
*/
export default (props /*: Props */) /*: string */ => {
  const styles = cssStyles();
  // Initialize global settings and state
  useEffect(() => {
    // setupMobileDebug();
    let stats = createStats();
    init();
  }, []);
  // // Metrics
  // const [flowTime /*: number */, setFlowTime /*: function */] = useState(0);
  // const [throughPut /*: number */, setThroughPut /*: function */] = useState(0);
  // const [wip /*: number */, setWip /*: function */] = useState(0);
  // const [flowTimeExp /*: number */, setFlowTimeExp /*: function */] =
  //   useState(0);
  // const [throughPutExp /*: number */, setThroughPutExp /*: function */] =
  //   useState(0);
  // const [wipExp /*: number */, setWipExp /*: function */] = useState(0);
  // const [value /*: number */, setValue /*: function */] = useState(0);
  // Params
  // const [fps, setFps] = useState(1);
  // const [wipLimitEachStep, setWipLimit] = useState(0);

  return html`
    <div id="flw" className="${styles.flw}">
      <div id="dom-overlay">
        <div id="console-ui"></div>
        <${Metrics} />
        <${Settings} />
        <${Params} />
      </div>
    </div>
  `;
};

//------------------------------------------------------------------
// cssStyles()
//------------------------------------------------------------------
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
