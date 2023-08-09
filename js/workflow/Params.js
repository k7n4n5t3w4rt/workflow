// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "./actions/gState.js";
import gSttngs from "./actions/gSttngs.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
import ArrivalRate from "./WorkflowSettings/ArrivalRate.js";
import FlwTimeMin from "./WorkflowSettings/FlwTimeMin.js";
import FlwTimeMax from "./WorkflowSettings/FlwTimeMax.js";
import DevUnits from "./WorkflowSettings/DevUnits.js";
import DevPowerFix from "./WorkflowSettings/DevPowerFix.js";
import AutoMode from "./WorkflowSettings/AutoMode.js";
import ShowMetrics from "./WorkflowSettings/ShowMetrics.js";
import Debug from "./WorkflowSettings/Debug.js";
import TimeBox from "./WorkflowSettings/TimeBox.js";
import Death from "./WorkflowSettings/Death.js";
import BacklogDeath from "./WorkflowSettings/BacklogDeath.js";
import DfntnOfReady from "./WorkflowSettings/DfntnOfReady.js";
import Fps from "./WorkflowSettings/Fps.js";
import ExpdtQueueLength from "./WorkflowSettings/ExpdtQueueLength.js";
import ExpdtDvUnitsFactor from "./WorkflowSettings/ExpdtDvUnitsFactor.js";
import ScaleCm from "./WorkflowSettings/ScaleCm.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../web_modules/simplestyle-js.js";
import cssStyles from "./cssStylesParams.js";
import getRawStyles from "./WorkflowSettings/getRawStyles.js";
// import setStateFunctionsStore from "./setStateFunctionsStore.js";
import hideOrShowParamsDivs from "./hideOrShowParamsDivs.js";
import isParsable from "./actions/isParsable.js";
import setUpdtngCnfg from "./WorkflowSettings/setUpdtngCnfg.js";

/*::
type Props = {
}
*/
export default (props /*: Props */) /*: string */ => {
  // Styles
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // A toggle to show or hide the params
  const [paramsToggle, setParamsToggle] = useState(false);
  const [steps, setSteps] = useState([]);
  // Hide or show the params divs when the toggle changes
  useEffect(hideOrShowParamsDivs(paramsToggle), [paramsToggle]);
  // The function that toggles the params by setting the toggle
  // to whatever it isn't
  const toggleParams = () => {
    setParamsToggle(!paramsToggle);
  };
  // A local state to hold the params
  // const [lState, setStateFunctions] = setStateFunctionsStore(useState);
  // Once, on load, update the local state from the global state
  useEffect(updateStepsStateFromGlobalState(setSteps), []);

  const changeStepMovingLimit =
    (
      setSteps /*: (any) => void */,
      index /*: number */,
    ) /*: (e: SyntheticInputEvent<HTMLInputElement>) => void */ =>
    (e /*: SyntheticInputEvent<HTMLInputElement> */) /*: void */ => {
      let value = e.target.value;
      if (isParsable(value)) {
        value = JSON.parse(value);
      }
      const steps = [...gSttngs().get("steps")];
      const step = steps[index];
      step.movingLimit = value;
      gSttngs().set("steps", steps);
      setSteps(steps);
    };

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
        <!------------------------------------------------------------------>
        <!-- Params -->
        <!------------------------------------------------------------------>
        ${steps.map(
          (
            step /*: { 
            name: string,
            status: string,
            limit: number,
            movingLimit: number,
            devUnits: number,
          } */,
            index /*: number */,
          ) /*: void */ => {
            if (step.status === "done") return html``;
            return html`
              <div>
                <div className="${styles.inputHeading}">
                  Step ${index}: ${step.name}
                </div>
                <label for="step${index}MovingLimit">MovingLimit</label>
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
                  max="200"
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

const updateStepsStateFromGlobalState =
  (setSteps /*: (any) => void */) /*: () => void */ => () /*: void */ => {
    setTimeout(updateStepsStateFromGlobalState(setSteps), 1000);
    const isUpdtngCnfg = gState().get("isUpdtngCnfg");
    if (isUpdtngCnfg !== true) {
      setSteps(gSttngs().get("steps"));
    }
  };
