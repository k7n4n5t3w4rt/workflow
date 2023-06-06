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

setSeed(seedString("wrkflw"));

const [styles] = createStyles({
  wrkflw: {
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
	scalecm: string,
	step: string,
  teamsnumber: string,
  teamsize: string
}
*/
export default (props /*: Props */) /*: string */ => {
  // Set some defaults for missing props
  gSttngs("speed", Math.abs(parseFloat(props.speed) || 1));
  // The default will be 0.1 == 10cm
  gSttngs("scaleCm", cleanInt(props.scalecm) || 2);
  gSttngs("scale", cleanInt(props.scalecm) / 100 || 0.02);
  gSttngs("x", gSttngs().scale);
  gSttngs("y", gSttngs().scale);
  gSttngs("z", gSttngs().scale);
  gSttngs("step", cleanInt(props.step) / 100 || gSttngs().scale * 5);
  // Set the number of teams to 1 so that we have one wrkflw
  gSttngs("teamsNumber", cleanInt(props.teamsnumber) || 1);
  // Set the number of people per team to 1 so that nothing changes for now
  gSttngs("teamSize", cleanInt(props.teamsize) || 400);
  // Populate the wrkflwStep array
  gSttngs("wrkflwSteps", [
    { name: "Open", status: "backlog" },
    { name: "Doing", status: "touch" },
    { name: "Ready for Test", status: "wait" },
    { name: "In Test", status: "touch" },
    { name: "Ready for Review", status: "wait" },
    { name: "In Review", status: "touch" },
    { name: "Done", status: "done" },
  ]);
  // wrkflwItem properties
  gSttngs("wrkflwItem", { effort: { min: 14, max: 520 } });
  gSttngs("valueUpdateInterval", 10);
  gSttngs("death", 260);

  // I'm not really using the state, but leaving it here just in case
  const [state /*: AppState */, dispatch] = useReducer(AppReducer, {
    speed: gSttngs().speed,
  });

  useEffect(() => {
    // setupMobileDebug();
    let stats = createStats();
    init();
  }, []);

  return html`
    <div id="wrkflw" className="${styles.wrkflw}">
      <div id="dom-overlay">
        <div id="console-ui"></div>
        <${Params} speed="${state.speed}" dispatch="${dispatch}" />
      </div>
    </div>
  `;
};

// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
function cleanInt(getVar /*: string */) /*: number */ {
  return Math.abs(Math.floor(parseFloat(getVar)) || 0);
}
