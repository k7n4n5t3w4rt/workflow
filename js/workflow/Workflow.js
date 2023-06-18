// @flow
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
import gSttngs from "./actions/gSttngs.js";
import gState from "./actions/gState.js";
import globalSettings from "./actions/globalSettings.js";
import globalState from "./actions/globalState.js";

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
  // Initialize global settings and state
  const styles = cssStyles();
  const [fps, setFps] = useState(1);
  const [flowTime /*: number */, setFlowTime /*: function */] = useState(0);
  const [throughPut /*: number */, setThroughPut /*: function */] = useState(0);
  const [wip /*: number */, setWip /*: function */] = useState(0);
  const [value /*: number */, setValue /*: function */] = useState(0);

  useEffect(() => {
    globalSettings(props);
    globalState();
    // setupMobileDebug();
    let stats = createStats();
    init();
    updateMetricsOnClickInterval(setFlowTime, setThroughPut, setWip, setValue);
  }, []);

  return html`
    <div id="flw" className="${styles.flw}">
      <div id="dom-overlay">
        <div id="console-ui"></div>
        <${Metrics}
          flowTime=${flowTime}
          throughPut=${throughPut}
          wip=${wip}
          value=${value}
        />
        <${Params} fps="${fps || 0}" />
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

//------------------------------------------------------------------
// updateMetricsOnClickInterval()
//------------------------------------------------------------------
const updateMetricsOnClickInterval = (
  setFlowTime /*: function */,
  setThroughPut /*: function */,
  setWip /*: function */,
  setValue /*: function */,
) /*: void */ => {
  setInterval(() => {
    if (
      gState().vQueue !== undefined &&
      gState().flwTmQueue !== undefined &&
      gState().thrPtQueue !== undefined &&
      gState().wipQueue !== undefined
    ) {
      setFlowTime(gState().flwTmQueue.mean());
      setThroughPut(gState().thrPtQueue.total());
      setWip(gState().wipQueue.mean());
      setValue(gState().vQueue.total());
    }
  }, 1000);
};
