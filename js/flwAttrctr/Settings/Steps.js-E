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
import ArrivalRate from "./ArrivalRate.js";
import FlwTimeMin from "./FlwTimeMin.js";
// import FlwTimeMax from "./FlwTimeMax.js_NOT_USED";
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
  const [styles /*: Object */, setStyles /*: function */] = useState({});
  useEffect(() => {
    rawStyles(getRawStyles());
    setStyles(cssStyles());
  }, []);

  // A toggle to show or hide the settings
  const [state, dispatch] = useContext(AppContext);

  return html`
    <!------------------------------------------------------------------>
    <!-- Steps -->
    <!------------------------------------------------------------------>
    <div>
      <p>
        If "Make WIP Limits per step an editable parameter" is checked, the
        users will be able to change the WIP limit of each step while the
        simulation is running.
      </p>
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
      <p>
        If "Make ${gSttngs().get("devUnitsTerm")} per step an editable
        parameter" is checked, the users will be able to change the number of
        ${gSttngs().get("devUnitsTerm")} for each step while the simulation is
        running.
      </p>
      <input
        type="checkbox"
        id="movingDevUnitsParam"
        name="movingDevUnitsParam"
        onChange=${changeSetting("movingDevUnitsParam", dispatch)}
        checked=${state.movingDevUnitsParam === true}
      />
      <label for="movingDevUnitsParam"
        >Make ${gSttngs().get("devUnitsTerm")} per step an editable
        parameter</label
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

            <p>The name of the step appears as a label in the workflow UI.</p>
            <${StepName}
              index=${index}
              name=${step.name}
              changeStepName=${changeStepName(index, dispatch)}
            />

            <p>
              There are 4 types of steps: "Backlog", "Wait", "Touch", and
              "Done". The first step (which is called "Step 0" because array
              notation) must be a "Backlog" step. "Touch" steps are active steps
              where work is being done. "Wait" steps are queues where work items
              wait for space in the next touch step (like "Ready for Test", for
              example). The last step must be a "Done" step.
            </p>
            <${Status}
              index=${index}
              status=${step.status}
              changeStepStatus=${changeStepStatus(index, dispatch)}
            />

            <p>
              The WIP limit for this step. If the number of work items in the
              step hits this limit, the step will not accept new work items
              until the number of work items is below the limit.
            </p>
            <p>
              In the real world, workflow steps usually have a limit - it just
              isn't explicitly stated. So, adding a WIP ("work in progress")
              limit to a step is simply a way of describing the implicit limit
              that already exists in the real-world workflow that we're trying
              to model.
            </p>
            <label for="step${index}Limit">WIP Limit:</label>
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
              <p>
                The number of ${gSttngs().get("devUnitsTerm")} that are
                responsible for getting this step of the workflow done. Don't
                double-dip here - assume that each one of the
                ${gSttngs().get("devUnitsTerm")} is primarily responsible for
                one step in the workflow. Later, you can toggle a setting that
                will allow ${gSttngs().get("devUnitsTerm")} to be shared between
                steps.
              </p>
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
              <p>
                Flow Time at Start is the "ideal" time for a step. If you're
                setting it to be the same as the Actual Flow Time (below), then
                you're saying that the current actual flow time is the baseline
                - an arbitrary '100%' against which all future flow times will
                be measured.
              </p>
              <p>
                If you set it to something that is NOT the current actual flow
                time, then you're saying that the current actual flow time is
                NOT the baseline, and that the aim of improving the system is to
                get the flow time back to this "ideal" flow time.
              </p>
              <p>
                This setting is integral to the Value calculation, and these two
                approaches reflect different ways of thinking about the value
                produced by the team. Is the team doing fine but trying to
                increase the amount of value they produce to, say, 300% of the
                current total? Then make the Flow Time at Start the same as the
                Actual Flow Time. Is the team less productive than they think
                they should be (based on Little's Law, for example)? In that
                case, set the Flow Time at Start to be less than the Actual Fow
                Time, and try to improve the flow time <i>back</i> to the Flow
                Time at Start, which will be 100% Value.
              </p>

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
              <p>
                The current, real-world time for a step, as gleaned from
                observation. For example, we might use a "time in status" Jira
                plugin, of else manually keep track of how long issues spend in
                which states.
              </p>
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
