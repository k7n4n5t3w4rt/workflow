// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../../web_modules/preact/hooks.js";
import { html } from "../../../web_modules/htm/preact.js";
import AutoMode from "./AutoMode.js";
import BacklogDeath from "./BacklogDeath.js";
import Death from "./Death.js";
import ExpdtDvUnitsFactor from "./ExpdtDvUnitsFactor.js";
import ExpdtQueueLength from "./ExpdtQueueLength.js";
import FlwItmSizeLimit from "./FlwItmSizeLimit.js";
import Fps from "./Fps.js";
import ScaleCm from "./ScaleCm.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
import calculateDevUnits from "../actions/calculateDevUnits.js";
import calculateMovingDevUnits from "../actions/calculateMovingDevUnits.js";
import changeSetting from "./changeSetting.js";
import changeStepDevUnits from "./changeStepMovingDevUnits.js";
import changeStepMovingLimit from "./changeStepMovingLimit.js";
import cssStyles from "./cssStylesParams.js";
import getRawStyles from "./getRawStyles.js";
import hideOrShowParamsDivs from "./hideOrShowParamsDivs.js";
import setStateFunctionsStore from "./setStateFunctionsStore.js";
import setUpdtngCnfg from "./setUpdtngCnfg.js";
import updateLocalStateFromGlobalState from "./updateLocalStateFromGlobalState.js";
import updateStepsStateFromGlobalState from "./updateStepsStateFromGlobalState.js";
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
  const [lState, setStateFunctions] = setStateFunctionsStore(useState);
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
        <!-- expdtQueueLength -->
        <!-------------------------------------------------------------------->
        <${ExpdtQueueLength}
          expdtQueueLength=${lState.expdtQueueLength}
          changeSetting=${changeSetting("expdtQueueLength", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- expdtDvUnitsFactor -->
        <!-------------------------------------------------------------------->
        <${ExpdtDvUnitsFactor}
          expdtDvUnitsFactor=${lState.expdtDvUnitsFactor}
          changeSetting=${changeSetting(
            "expdtDvUnitsFactor",
            setStateFunctions,
          )}
        />
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
                  max="${lState.paramsMaxWip}"
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
        <!-- FLOW ITEMS SIZE LIMIT -->
        <!-------------------------------------------------------------------->
        <div className="${styles.inputHeading}">
          Size Limit for Flow Items (% of current max. size)
        </div>
        <${FlwItmSizeLimit}
          flwItmSizeLimit=${lState.flwItmSizeLimit}
          changeSetting=${changeSetting("flwItmSizeLimit", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Death -->
        <!-------------------------------------------------------------------->
        <${Death}
          death=${lState.death}
          changeSetting=${changeSetting("death", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- BacklogDeath -->
        <!-------------------------------------------------------------------->
        <${BacklogDeath}
          backlogDeath=${lState.backlogDeath}
          changeSetting=${changeSetting("backlogDeath", setStateFunctions)}
        />
        <!------------------------------------------------------------------>
        <!-- DISPLAY -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Display</div>
        <!-------------------------------------------------------------------->
        <!-- DISPLAY: FRAMES PER SECOND -->
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
      <span className="material-icons ${styles.paramsIcon}"> build </span>
    </div>
  `;
};
export default Params;
