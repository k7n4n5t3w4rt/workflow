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
import gSettings from "./actions/gSettings.js";
import gState from "./actions/gState.js";

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
  teamsnumber: string,
  teamsize: string
}
*/
export default (props /*: Props */) /*: string */ => {
  // Set some defaults for missing props
  gSettings("speed", Math.abs(parseFloat(props.speed) || 1));
  // The default will be 0.1 == 10cm
  gSettings("xCm", cleanInt(props.xcm) / 100 || 0.1);
  gSettings("yCm", cleanInt(props.ycm) / 100 || 0.1);
  gSettings("zCm", cleanInt(props.zcm) / 100 || 0.1);
  // Set the number of teams to 1 so that we have one workflow
  gSettings("teamsNumber", cleanInt(props.teamsnumber) || 1);
  // Set the number of people per team to 1 so that nothing changes for now
  gSettings("teamSize", cleanInt(props.teamsize) || 400);
  // Populate the workflowStatus array
  gSettings("workflowStatuses", [
    { name: "Open", category: "backlog" },
    { name: "Doing", category: "touch" },
    { name: "Ready for Review", category: "wait" },
    { name: "In Review", category: "external" },
    { name: "Done", category: "complete" },
  ]);
  // workflowItem properties
  gSettings("workflowItem", { effort: { min: 14, max: 500 } });

  // I'm not really using the state, but leaving it here just in case
  const [state /*: AppState */, dispatch] = useReducer(AppReducer, {
    speed: gSettings().speed,
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

// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
function cleanInt(getVar /*: string */) /*: number */ {
  return Math.abs(Math.floor(parseFloat(getVar)) || 0);
}
