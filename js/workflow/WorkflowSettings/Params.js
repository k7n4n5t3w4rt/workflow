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
import FlwItmSizeMin from "./FlwItmSizeMin.js";
import FlwItmSizeMax from "./FlwItmSizeMax.js";
import DevUnits from "./DevUnits.js";
import DevCapacityAvailable from "./DevCapacityAvailable.js";
import Drag from "./Drag.js";
import AutoMode from "./AutoMode.js";
import ShowMetrics from "./ShowMetrics.js";
import Debug from "./Debug.js";
import TimeBox from "./TimeBox.js";
import Death from "./Death.js";
import BacklogDeath from "./BacklogDeath.js";
import FlwItmSizeFactor from "./FlwItmSizeFactor.js";
import DfntnOfReady from "./DfntnOfReady.js";
import Fps from "./Fps.js";
import ExpdtQueueLength from "./ExpdtQueueLength.js";
import ExpdtDvUnitsFactor from "./ExpdtDvUnitsFactor.js";
import WipLimiitEachStep from "./WipLimitEachStep.js";
import ScaleCm from "./ScaleCm.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
import updateLocalStateFromGlobalState from "./updateLocalStateFromGlobalState.js";
import hideOrShowParamsDivs from "./hideOrShowParamsDivs.js";
import cssStyles from "./cssStylesParams.js";
import getRawStyles from "./getRawStyles.js";
import setStateFunctionsStore from "./setStateFunctionsStore.js";
import changeSetting from "./changeSetting.js";
import isParsable from "../actions/isParsable.js";

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
  useEffect(hideOrShowParamsDivs(paramsToggle), [paramsToggle]);
  // The function that toggles the settings by setting the toggle
  // to whatever it isn't
  const toggleParams = () => {
    setParamsToggle(!paramsToggle);
  };
  // A local state to hold the settings
  const [lState, setStateFunctions] = setStateFunctionsStore(useState);
  // Once, on load, update the local state from the global state
  useEffect(updateLocalStateFromGlobalState(setStateFunctions), []);
  useEffect(updateStepsStateFromGlobalState(setSteps), []);

  const changeStepLimit =
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
      step.limit = value;
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
        <!-- Steps -->
        <!------------------------------------------------------------------>
        ${steps.map(
          (
            step /*: { 
            name: string,
            status: string,
            limit: number,
            preload: number,
          } */,
            index /*: number */,
          ) /*: void */ => {
            if (step.status === "done") return html``;
            return html` <div>
              <label for="step${index}Limit"
                >Step ${index} (“${step.name}”) Limit</label
              >
              <input
                type="number"
                id="step${index}Limit"
                name="step${index}Limit"
                value="${step.limit}"
                onChange=${changeStepLimit(setSteps, index)}
              />
            </div>`;
          },
        )}
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

const updateStepsStateFromGlobalState =
  (setSteps /*: (any) => void */) /*: () => void */ => () /*: void */ => {
    setTimeout(updateStepsStateFromGlobalState(setSteps), 1000);
    setSteps(gSttngs().get("steps"));
  };
