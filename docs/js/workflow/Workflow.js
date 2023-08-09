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
import Metrics from "./WorkflowMetrics/Metrics.js";
import Share from "./Share.js";
import Params from "./Params.js";
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
	sid?: string,
	share?: string,
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
  useEffect(() => {
    loadSharedSettings(props.sid, props.share)();
  }, [props.share]);

  return html`
    <div id="flw" className="${styles.flw}">
      <div id="dom-overlay">
        <div id="console-ui"></div>
        <${Metrics} />
        <${Share} />
        <${Params} />
      </div>
    </div>
  `;
};
//------------------------------------------------------------------
// loadSharedSettings()
//------------------------------------------------------------------
const loadSharedSettings =
  (
    sid /*: string | typeof undefined */,
    share /*: string | typeof undefined */,
  ) /*: () => void */ =>
  () /*: void */ => {
    // This is a random asynchronous setting to check
    const death = gSttngs().get("death");
    if (death !== undefined) {
      if (sid !== undefined && share !== undefined) {
        gSttngs().setSid(sid);
        const keyValuePairs = JSON.parse(atob(share));
        Object.keys(keyValuePairs).forEach((key /*: string */) /*: void */ => {
          console.log(key, keyValuePairs[key]);
          gSttngs().set(key, keyValuePairs[key]);
        });
      }
    } else {
      setTimeout(loadSharedSettings(sid, share), 1000);
    }
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
