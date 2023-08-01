// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "../actions/gState.js";
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../../web_modules/preact/hooks.js";
import { html } from "../../../web_modules/htm/preact.js";
import ArrivalRate from "./ArrivalRate.js";
import FlwTimeMin from "./FlwTimeMin.js";
import FlwTimeMax from "./FlwTimeMax.js";
import DevUnits from "./DevUnits.js";
import DevPowerFix from "./DevPowerFix.js";
import AutoMode from "./AutoMode.js";
import ShowMetrics from "./ShowMetrics.js";
import Debug from "./Debug.js";
import TimeBox from "./TimeBox.js";
import Death from "./Death.js";
import BacklogDeath from "./BacklogDeath.js";
import DfntnOfReady from "./DfntnOfReady.js";
import Fps from "./Fps.js";
import ExpdtQueueLength from "./ExpdtQueueLength.js";
import ExpdtDvUnitsFactor from "./ExpdtDvUnitsFactor.js";
import ScaleCm from "./ScaleCm.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
import hideOrShowParamsDivs from "./hideOrShowParamsDivs.js";
import cssStyles from "./cssStylesParams.js";
import getRawStyles from "./getRawStyles.js";
import setStateFunctionsStore from "./setStateFunctionsStore.js";
import changeSetting from "./changeSetting.js";
import isParsable from "../actions/isParsable.js";
import setUpdtngCnfg from "./setUpdtngCnfg.js";

/*::
type Props = {
}
*/
export default (props /*: Props */) /*: string */ => {
  // Styles
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // A toggle to show or hide the settings
  const [paramsToggle, setParamsToggle] = useState(false);
  const [steps, setSteps] = useState([]);
  // Hide or show the settings divs when the toggle changes
  // useEffect(hideOrShowParamsDivs(paramsToggle), [paramsToggle]);
  // The function that toggles the settings by setting the toggle
  // to whatever it isn't
  const toggleParams = () => {
    setParamsToggle(!paramsToggle);
  };
  // A local state to hold the settings
  const [lState, setStateFunctions] = setStateFunctionsStore(useState);
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
            devUnits: number,
            preload: number,
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
