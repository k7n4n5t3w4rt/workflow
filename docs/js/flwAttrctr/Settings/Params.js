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
  useContext,
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
import { AppContext } from "../../AppContext.js";
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
import setUpdtngCnfg from "./setUpdtngCnfg.js";
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
  const [state, dispatch] = useContext(AppContext);
  // A toggle to show or hide the params
  const [paramsToggle, setParamsToggle] = useState(false);
  // Hide or show the params divs when the toggle changes
  useEffect(hideOrShowParamsDivs(paramsToggle), [paramsToggle]);
  useEffect(() => {
    setTimeout(() => {
      hideParamsIconOnLoad();
    }, 100);
  }, []);
  // The function that toggles the params by setting the toggle
  // to whatever it isn't
  const toggleParams = () => {
    setParamsToggle(!paramsToggle);
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
        ${state.movingWipLimitsParam === true &&
        html`
          <!-------------------------------------------------------------------->
          <!-- STEP WIP LIMIT -->
          <!-------------------------------------------------------------------->
          <div className="${styles.inputHeading}">WIP Limits</div>
          ${(state.steps || []).map(
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
                    >WIP limit for "${step.name}":</label
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
                    max="${state.paramsMaxWip}"
                    step="1"
                    onChange=${changeStepMovingLimit(index, dispatch)}
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
        `}
        ${state.movingDevUnitsParam === true &&
        html`
          <!-------------------------------------------------------------------->
          <!-- STEP DEV UNITS -->
          <!-------------------------------------------------------------------->
          <div className="${styles.inputHeading}">
            Devs / Teams (${calculateMovingDevUnits()}/${calculateDevUnits()})
          </div>
          ${(state.steps || []).map(
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
                  <label for="step${index}DevUnit"
                    >Dev units working on "${step.name}" items:</label
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
                    onChange=${changeStepDevUnits(index, dispatch)}
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
        `}
        ${state.flwItmSizeLimitParam === true &&
        html`
          <!-------------------------------------------------------------------->
          <!-- FLOW ITEMS SIZE LIMIT -->
          <!-------------------------------------------------------------------->
          <div className="${styles.inputHeading}">
            Size Limit for Flow Items (% of current max. size)
          </div>
          <${FlwItmSizeLimit}
            flwItmSizeLimit=${state.flwItmSizeLimit}
            changeSetting=${changeSetting("flwItmSizeLimit", dispatch)}
          />
        `}
        ${(state.expdtQueueLengthParam === true ||
          state.expdtDvUnitsFactorParam === true) &&
        html`
          <!-------------------------------------------------------------------->
          <!-- EXPEDITE QUEUE -->
          <!-------------------------------------------------------------------->
          <div className="${styles.inputHeading}">Exptedite Queue</div>
          ${state.expdtQueueLengthParam === true &&
          html`
            <!-------------------------------------------------------------------->
            <!-- expdtQueueLength -->
            <!-------------------------------------------------------------------->
            <${ExpdtQueueLength}
              expdtQueueLength=${state.expdtQueueLength}
              changeSetting=${changeSetting("expdtQueueLength", dispatch)}
            />
          `}
          ${state.expdtDvUnitsFactorParam === true &&
          html`
            <!-------------------------------------------------------------------->
            <!-- expdtDvUnitsFactor -->
            <!-------------------------------------------------------------------->
            <${ExpdtDvUnitsFactor}
              expdtDvUnitsFactor=${state.expdtDvUnitsFactor}
              changeSetting=${changeSetting("expdtDvUnitsFactor", dispatch)}
            />
          `}
        `}
        ${(state.deathParam === true || state.backlogDeathParam === true) &&
        html`
          <!-------------------------------------------------------------------->
          <!-- AGE -->
          <!-------------------------------------------------------------------->
          <div className="${styles.inputHeading}">Work Item Age</div>
          ${state.deathParam === true &&
          html`
            <!-------------------------------------------------------------------->
            <!-- Death -->
            <!-------------------------------------------------------------------->
            <${Death}
              death=${state.death}
              changeSetting=${changeSetting("death", dispatch)}
            />
          `}
          ${state.backlogDeathParam === true &&
          html`
            <!-------------------------------------------------------------------->
            <!-- BacklogDeath -->
            <!-------------------------------------------------------------------->
            <${BacklogDeath}
              backlogDeath=${state.backlogDeath}
              changeSetting=${changeSetting("backlogDeath", dispatch)}
            />
          `}
        `}
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
//------------------------------------------------------------------
// FUNCTION: hideParamsIconOnLoad()
//------------------------------------------------------------------
export const hideParamsIconOnLoad = () /*: void */ => {
  const paramsIcon = document.getElementById("params-icon");
  if (paramsIcon !== null) {
    paramsIcon.style.display = "none";
  }
};
