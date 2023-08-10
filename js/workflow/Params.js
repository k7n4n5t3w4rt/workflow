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
import AutoMode from "./WorkflowSettings/AutoMode.js";
import Fps from "./WorkflowSettings/Fps.js";
import ScaleCm from "./WorkflowSettings/ScaleCm.js";
import Sid from "./WorkflowSettings/Sid.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../web_modules/simplestyle-js.js";
import cssStyles from "./WorkflowSettings/cssStylesParams.js";
import getRawStyles from "./WorkflowSettings/getRawStyles.js";
import setStateParamsFunctionsStore from "./WorkflowSettings/setStateParamsFunctionsStore.js";
import hideOrShowParamsDivs from "./WorkflowSettings/hideOrShowParamsDivs.js";
import isParsable from "./actions/isParsable.js";
import setUpdtngCnfg from "./WorkflowSettings/setUpdtngCnfg.js";
import changeSetting from "./WorkflowSettings/changeSetting.js";
import changeSid from "./WorkflowSettings/changeSid.js";
import updateLocalStateFromGlobalState from "./WorkflowSettings/updateLocalParamsStateFromGlobalState.js";
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
        <!-- Auto Mode -->
        <!-------------------------------------------------------------------->
        <${AutoMode}
          autoMode=${lState.autoMode}
          styles=${styles}
          changeSetting=${changeSetting("autoMode", setStateFunctions)}
        />
        <!------------------------------------------------------------------>
        <!-- SID -->
        <!------------------------------------------------------------------>
        <${Sid}
          sid=${lState.sid}
          styles=${styles}
          changeSid=${changeSid(setStateFunctions)}
        />

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
export default Params;
//------------------------------------------------------------------
// changeStepMovingLimit()
//------------------------------------------------------------------
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
//------------------------------------------------------------------
// updateStepsStateFromGlobalState()
//------------------------------------------------------------------
const updateStepsStateFromGlobalState =
  (setSteps /*: (any) => void */) /*: () => void */ => () /*: void */ => {
    setTimeout(updateStepsStateFromGlobalState(setSteps), 1000);
    const isUpdtngCnfg = gState().get("isUpdtngCnfg");
    if (isUpdtngCnfg !== true) {
      setSteps(gSttngs().get("steps"));
    }
  };
