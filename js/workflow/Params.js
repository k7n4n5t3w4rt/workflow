// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./actions/gSttngs.js";
import gState from "./actions/gState.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
import AutoMode from "./WorkflowSettings/AutoMode.js";
import Fps from "./WorkflowSettings/Fps.js";
import ScaleCm from "./WorkflowSettings/ScaleCm.js";
import Sid from "./WorkflowSettings/Sid.js";
import FlwItmSizeLimit from "./WorkflowSettings/FlwItmSizeLimit.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../web_modules/simplestyle-js.js";
import cssStyles from "./WorkflowSettings/cssStylesParams.js";
import getRawStyles from "./WorkflowSettings/getRawStyles.js";
import setStateParamsFunctionsStore from "./WorkflowSettings/setStateParamsFunctionsStore.js";
import hideOrShowParamsDivs from "./WorkflowSettings/hideOrShowParamsDivs.js";
import setUpdtngCnfg from "./WorkflowSettings/setUpdtngCnfg.js";
import changeSetting from "./WorkflowSettings/changeSetting.js";
import changeSid from "./WorkflowSettings/changeSid.js";
import updateLocalStateFromGlobalState from "./WorkflowSettings/updateLocalParamsStateFromGlobalState.js";
import changeStepMovingLimit from "./changeStepMovingLimit.js";
import changeStepDevUnits from "./changeStepMovingDevUnits.js";
import updateStepsStateFromGlobalState from "./updateStepsStateFromGlobalState.js";
import calculateDevUnits from "./actions/calculateDevUnits.js";
import calculateMovingDevUnits from "./actions/calculateMovingDevUnits.js";
//------------------------------------------------------------------
// Params
//------------------------------------------------------------------
/*::
type Props = {
}
*/
export const Params = (props /*: Props */) /*: string */ => {
  // Styles
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // A toggle to show or hide the params
  const [paramsToggle, setParamsToggle] = useState(false);
  // A local state to hold the params
  const [steps, setSteps] = useState([]);
  const [lState, setStateFunctions] = setStateParamsFunctionsStore(useState);
  // Hide or show the params divs when the toggle changes
  useEffect(hideOrShowParamsDivs(paramsToggle), [paramsToggle]);
  // The function that toggles the params by setting the toggle
  // to whatever it isn't
  const toggleParams = () => {
    setParamsToggle(!paramsToggle);
  };
  // Once, on load, update the local state from the global state
  useEffect(updateStepsStateFromGlobalState(setSteps), []);
  useEffect(updateLocalStateFromGlobalState(setStateFunctions), []);

  return html`
    <div
      id="params-close-icon"
      className="${styles.paramsClose}"
      onClick="${toggleParams}"
    >
      <span className="material-icons ${styles.paramsIcon}"> close </span>
    </div>

    <div id="params-container" className="${styles.paramsContainer}">
      <fieldset>
        <!-------------------------------------------------------------------->
        <!-- STEP WIP LIMIT -->
        <!-------------------------------------------------------------------->
        <div className="${styles.inputHeading}">WIP Limits</div>
        ${(steps || []).map(
          (
            step /*: { 
            name: string,
            status: string,
            limit: number,
            movingLimit: number,
            movingDevUnits: number,
          } */,
            index /*: number */,
          ) /*: void */ => {
            if (step.status === "done") return html``;
            return html`
              <div>
                <label for="step${index}MovingLimit"
                  >Step ${index}: ${step.name}:</label
                >
                <output
                  id="step${index}MovingLimitOutput"
                  name="step${index}MovingLimitOutput"
                  for="step${index}MovingLimitOutput"
                  >${step.movingLimit.toString()}</output
                >
                <input
                  type="range"
                  id="step${index}MovingLimit"
                  name="step${index}MovingLimit"
                  min="0"
                  max="${gSttngs().get("paramsMaxWip")}"
                  step="1"
                  onChange=${changeStepMovingLimit(setSteps, index)}
                  onTouchStart=${setUpdtngCnfg(true)}
                  onTouchEnd=${setUpdtngCnfg(false)}
                  onMouseDown=${setUpdtngCnfg(true)}
                  onMouseUp=${setUpdtngCnfg(false)}
                  value="${step.movingLimit.toString()}"
                />
              </div>
            `;
          },
        )}
        <!-------------------------------------------------------------------->
        <!-- STEP DEV UNITS -->
        <!-------------------------------------------------------------------->
        <div className="${styles.inputHeading}">
          Devs/Teams (${calculateMovingDevUnits()}/${calculateDevUnits()})
        </div>
        ${(steps || []).map(
          (
            step /*: { 
            name: string,
            status: string,
            limit: number,
            movingLimit: number,
            movingDevUnits: number,
            movingDevUnits: number,
          } */,
            index /*: number */,
          ) /*: void */ => {
            if (step.status !== "touch") return html``;
            return html`
              <div>
                <label for="step${index}DevUnits"
                  >Step ${index}: ${step.name}:</label
                >s
                <output
                  id="step${index}DevUnitsOutput"
                  name="step${index}DevUnitsOutput"
                  for="step${index}DevUnitsOutput"
                  >${(step.movingDevUnits || 0).toString()}</output
                >
                <input
                  type="range"
                  id="step${index}DevUnit"
                  name="step${index}DevUnit"
                  min="0"
                  max="${calculateDevUnits()}"
                  step="1"
                  onChange=${changeStepDevUnits(setSteps, index)}
                  onTouchStart=${setUpdtngCnfg(true)}
                  onTouchEnd=${setUpdtngCnfg(false)}
                  onMouseDown=${setUpdtngCnfg(true)}
                  onMouseUp=${setUpdtngCnfg(false)}
                  value="${(step.movingDevUnits || 0).toString()}"
                />
              </div>
            `;
          },
        )}
        <!-------------------------------------------------------------------->
        <!-- flwItmSizeLimit -->
        <!-------------------------------------------------------------------->
        <div className="${styles.inputHeading}">
          Size Limit for Flow Items (% of current max. size)
        </div>
        <${FlwItmSizeLimit}
          flwItmSizeLimit=${lState.flwItmSizeLimit}
          changeSetting=${changeSetting("flwItmSizeLimit", setStateFunctions)}
        />
        <!------------------------------------------------------------------>
        <!-- SHARING -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Sharing</div>
        <!-------------------------------------------------------------------->
        <!-- ID -->
        <!-------------------------------------------------------------------->
        <${Sid}
          sid=${lState.sid}
          styles=${styles}
          changeSid=${changeSid(setStateFunctions)}
        />
        <!------------------------------------------------------------------>
        <!-- DISPLAY -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Display</div>
        <!-------------------------------------------------------------------->
        <!-- fps -->
        <!-------------------------------------------------------------------->
        <${Fps}
          fps=${lState.fps}
          changeSetting=${changeSetting("fps", setStateFunctions)}
        />
      </fieldset>
    </div>
    <div
      id="params-icon"
      className="${styles.params}"
      onClick="${toggleParams}"
    >
      <span className="material-icons ${styles.paramsIcon}"> settings </span>
    </div>
  `;
};
export default Params;
