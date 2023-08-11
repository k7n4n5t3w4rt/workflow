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
import FlwItmSizeFactor from "./FlwItmSizeLimit.js";
import DfntnOfReady from "./DfntnOfReady.js";
import Fps from "./Fps.js";
import ExpdtQueueLength from "./ExpdtQueueLength.js";
import ExpdtDvUnitsFactor from "./ExpdtDvUnitsFactor.js";
import ScaleCm from "./ScaleCm.js";
import Status from "./Status.js";
import StepName from "./StepName.js";
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
import isParsable from "../actions/isParsable.js";
import setUpdtngCnfg from "./setUpdtngCnfg.js";

/*::
type Props = {
  numberOfSteps: number,
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
  useEffect(
    () /*: void */ => {
      if (
        props.numberOfSteps === undefined ||
        steps.length === undefined ||
        props.numberOfSteps === 0 ||
        steps.length === 0
      ) {
        return;
      }
      if (props.numberOfSteps < steps.length) {
        while (props.numberOfSteps < steps.length) {
          steps.pop();
        }
      } else if (props.numberOfSteps > steps.length) {
        // The last step, if it exists, is always done
        if (steps.length > 0) steps[steps.length - 1].status = "wait";
        while (props.numberOfSteps > steps.length) {
          steps.push({
            name: "Step " + (steps.length + 1),
            status: "wait",
            limit: 0,
            movingLimit: 0,
            devUnits: 0,
            flwTimeAtStart: 1,
          });
        }
      }
      // The first step is always backlog
      steps[0].status = "backlog";
      // The last step is always done
      steps[steps.length - 1].status = "done";
      steps.forEach((step /*: FlwStep */, index /*: number */) /*: void */ => {
        step.limit = step.limit || 0;
        step.movingLimit = step.movingLimit || 0;
        if (step.status !== "touch") {
          delete step.devUnits;
          delete step.flwTimeAtStart;
        }
        if (step.status === "touch") {
          step.devUnits = step.devUnits || 0;
          step.flwTimeAtStart = step.flwTimeAtStart || 1;
        }
        if (step.status === "done") {
          step.limit = 0;
          delete step.movingLimit;
        }
      });
      setSteps(steps);
      gSttngs().set("steps", steps);
    },
    [props.numberOfSteps],
  );
  useEffect(updateLocalStateFromGlobalState(setStateFunctions), []);
  useEffect(updateStepsStateFromGlobalState(setSteps), []);

  const changeStepName =
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
      step.name = value;
      gSttngs().set("steps", steps);
      setSteps(steps);
    };

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

  const changeStepDevUnits =
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
      step.devUnits = value;
      gSttngs().set("steps", steps);
      setSteps(steps);
    };

  const changeStepStatus =
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
      step.status = value;
      gSttngs().set("steps", steps);
      setSteps(steps);
    };

  const changeStepFlwTimeAtStart =
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
      step.flwTimeAtStart = value;
      gSttngs().set("steps", steps);
      setSteps(steps);
    };
  // <div id="params-container" className="${styles.paramsContainer}">
  //   <fieldset>
  return html`
    <!------------------------------------------------------------------>
    <!-- Steps -->
    <!------------------------------------------------------------------>
    ${(steps || []).map(
      (
        step /*: { 
            name: string,
            status: string,
            limit: number,
            devUnits: number,
            flwTimeAtStart: number
          } */,
        index /*: number */,
      ) /*: void */ => {
        return html`
          <div>
            <div className="${styles.stepHeading}">Step ${index}</div>
            <${StepName}
              index=${index}
              name=${step.name}
              changeStepName=${changeStepName(setSteps, index)}
            />
            <${Status}
              index=${index}
              status=${step.status}
              changeStepStatus=${changeStepStatus(setSteps, index)}
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
              onChange=${changeStepLimit(setSteps, index)}
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
                onChange=${changeStepDevUnits(setSteps, index)}
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
                onChange=${changeStepFlwTimeAtStart(setSteps, index)}
                onTouchStart=${setUpdtngCnfg(true)}
                onTouchEnd=${setUpdtngCnfg(false)}
                onMouseDown=${setUpdtngCnfg(true)}
                onMouseUp=${setUpdtngCnfg(false)}
                value="${(step.flwTimeAtStart || 0).toString()}"
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

const updateStepsStateFromGlobalState =
  (setSteps /*: (any) => void */) /*: () => void */ => () /*: void */ => {
    setTimeout(updateStepsStateFromGlobalState(setSteps), 1000);
    const isUpdtngCnfg = gState().get("isUpdtngCnfg");
    if (isUpdtngCnfg !== true) {
      setSteps(gSttngs().get("steps"));
    }
  };
