// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useContext,
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
import FlwItmSizeFactor from "./FlwItmSizeLimit.js";
import DfntnOfReady from "./DfntnOfReady.js";
import Fps from "./Fps.js";
import ExpdtQueueLength from "./ExpdtQueueLength.js";
import ExpdtDvUnitsFactor from "./ExpdtDvUnitsFactor.js";
import ScaleCm from "./ScaleCm.js";
import Status from "./Status.js";
import StepName from "./StepName.js";
import { AppContext } from "../../AppContext.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
import updateLocalStateFromGlobalState from "./updateLocalStateFromGlobalState.js";
// import hideOrShowParamsDivs from "./hideOrShowParamsDivs.js";
import cssStyles from "./cssStylesSettings.js";
import getRawStyles from "./getRawStyles.js";
import setStateFunctionsStore from "./setStateFunctionsStore.js";
import changeSetting from "./changeSetting.js";
import setUpdtngCnfg from "./setUpdtngCnfg.js";
import populateSteps from "./populateSteps.js";
import changeStepName from "./changeStepName.js";
import changeStepLimit from "./changeStepLimit.js";
import changeStepDevUnits from "./changeStepDevUnits.js";
import changeStepStatus from "./changeStepStatus.js";
import changeStepFlwTimeAtStart from "./changeStepFlwTimeAtStart.js";
import changeStepActualFlwTime from "./changeStepActualFlwTime.js";
//------------------------------------------------------------------
// FUNCTION: Steps
//------------------------------------------------------------------
/*::
type Props = {
  numberOfSteps: number,
}
*/
export const Steps = (props /*: Props */) /*: string */ => {
  // Styles
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // A toggle to show or hide the settings
  const [state, dispatch] = useContext(AppContext);
  const [paramsToggle, setParamsToggle] = useState(false);
  // Hide or show the settings divs when the toggle changes
  // useEffect(hideOrShowParamsDivs(paramsToggle), [paramsToggle]);
  // The function that toggles the settings by setting the toggle
  // to whatever it isn't
  const toggleParams = () => {
    setParamsToggle(!paramsToggle);
  };

  // <div id="params-container" className="${styles.paramsContainer}">
  //   <fieldset>
  return html`
    <!------------------------------------------------------------------>
    <!-- Steps -->
    <!------------------------------------------------------------------>
    <div>
      <input
        type="checkbox"
        id="movingWipLimitsParam"
        name="movingWipLimitsParam"
        onChange=${changeSetting("movingWipLimitsParam", dispatch)}
        checked=${state.movingWipLimitsParam === true}
      />
      <label for="movingWipLimitsParam"
        >Make WIP Limits per step an editable parameter</label
      >
    </div>
    <div>
      <input
        type="checkbox"
        id="movingDevUnitsParam"
        name="movingDevUnitsParam"
        onChange=${changeSetting("movingDevUnitsParam", dispatch)}
        checked=${state.movingDevUnitsParam === true}
      />
      <label for="movingDevUnitsParam"
        >Make DevUnts per step an editable parameter</label
      >
    </div>
    ${(state.steps || []).map(
      (
        step /*: { 
            name: string,
            status: string,
            limit: number,
            devUnits: number,
            flwTimeAtStart: number,
            actualFlwTime: number
          } */,
        index /*: number */,
      ) /*: void */ => {
        return html`
          <div>
            <div className="${styles.stepHeading}">Step ${index}</div>
            <${StepName}
              index=${index}
              name=${step.name}
              changeStepName=${changeStepName(index, dispatch)}
            />
            <${Status}
              index=${index}
              status=${step.status}
              changeStepStatus=${changeStepStatus(index, dispatch)}
            />
            <label for="step${index}Limit">Limit:</label>
            <output
              id="step${index}LimitOutput"
              name="step${index}LimitOutput"
              for="step${index}LimitOutput"
              >${step.limit.toString()}</output
            >
            <input
              type="range"
              id="step${index}Limit"
              name="step${index}Limit"
              min="0"
              max="200"
              step="1"
              onChange=${changeStepLimit(index, dispatch)}
              onTouchStart=${setUpdtngCnfg(true)}
              onTouchEnd=${setUpdtngCnfg(false)}
              onMouseDown=${setUpdtngCnfg(true)}
              onMouseUp=${setUpdtngCnfg(false)}
              value="${step.limit.toString()}"
            />
          </div>
          ${step.status === "touch" &&
          html`
            <div>
              <label for="step${index}DevUnits">Dev Units</label>
              <output
                id="step${index}DevUnitsOutput"
                name="step${index}DevUnitsOutput"
                for="step${index}DevUnitsOutput"
                >${(step.devUnits || 0).toString()}</output
              >
              <input
                type="range"
                id="step${index}DevUnits"
                name="step${index}DevUnits"
                min="1"
                max="100"
                step="1"
                onChange=${changeStepDevUnits(index, dispatch)}
                onTouchStart=${setUpdtngCnfg(true)}
                onTouchEnd=${setUpdtngCnfg(false)}
                onMouseDown=${setUpdtngCnfg(true)}
                onMouseUp=${setUpdtngCnfg(false)}
                value="${(step.devUnits || 0).toString()}"
              />
            </div>
            <div>
              <label for="step${index}FlwTimeAtStart"
                >Av. Flow Time at Start:</label
              >
              <output
                id="step${index}FlwTimeAtStartOutput"
                name="step${index}FlwTimeAtStartOutput"
                for="step${index}FlwTimeAtStartOutput"
                >${(step.flwTimeAtStart || 0).toString()}</output
              >
              <input
                type="range"
                id="step${index}FlwTimeAtStart"
                name="step${index}FlwTimeAtStart"
                min="0.5"
                max="200"
                step="0.5"
                onChange=${changeStepFlwTimeAtStart(index, dispatch)}
                onTouchStart=${setUpdtngCnfg(true)}
                onTouchEnd=${setUpdtngCnfg(false)}
                onMouseDown=${setUpdtngCnfg(true)}
                onMouseUp=${setUpdtngCnfg(false)}
                value="${(step.flwTimeAtStart || 0).toString()}"
              />
            </div>
            <div>
              <label for="step${index}ActualFlwTime"
                >Actual Av. Flow Time:</label
              >
              <output
                id="step${index}ActualFlwTimeOutput"
                name="step${index}ActualFlwTimeOutput"
                for="step${index}ActualFlwTimeOutput"
                >${(step.actualFlwTime || 0).toString()}</output
              >
              <input
                type="range"
                id="step${index}ActualFlwTime"
                name="step${index}ActualFlwTime"
                min="0.5"
                max="200"
                step="0.5"
                onChange=${changeStepActualFlwTime(index, dispatch)}
                onTouchStart=${setUpdtngCnfg(true)}
                onTouchEnd=${setUpdtngCnfg(false)}
                onMouseDown=${setUpdtngCnfg(true)}
                onMouseUp=${setUpdtngCnfg(false)}
                value="${(step.actualFlwTime || 0).toString()}"
              />
            </div>
          `}
        `;
      },
    )}
  `;
  //   </fieldset>
  // </div>
};
export default Steps;
