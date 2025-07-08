// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
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
import DevUnits from "./DevUnits.js";
import DevPowerFix from "./DevPowerFix.js";
import Drag from "./Drag.js";
import DragPoint from "./DragPoint.js";
import ParetoPoint from "./ParetoPoint.js";
import AutoMode from "./AutoMode.js";
import EasyStorage from "./EasyStorage.js";
import ShowMetrics from "./ShowMetrics.js";
import Debug from "./Debug.js";
import TimeBox from "./TimeBox.js";
import Death from "./Death.js";
import BacklogDeath from "./BacklogDeath.js";
import FlwItmSizeLimit from "./FlwItmSizeLimit.js";
import DfntnOfReady from "./DfntnOfReady.js";
import Fps from "./Fps.js";
import ExpdtQueueLength from "./ExpdtQueueLength.js";
import ExpdtDvUnitsFactor from "./ExpdtDvUnitsFactor.js";
import ScaleCm from "./ScaleCm.js";
import RangeMax from "./RangeMax.js";
import RangeIncreaseRate from "./RangeIncreaseRate.js";
import RangeMidpoint from "./RangeMidpoint.js";
import DevUnitsTerm from "./DevUnitsTerm.js";
import DisplayNameInput from "./DisplayNameInput.js";
import DevUnitsMoveToWork from "./DevUnitsMoveToWork.js";
import Sid from "./Sid.js";
import Steps from "./Steps.js";
import NumberOfSteps from "./NumberOfSteps.js";
import ParamsMaxWip from "./ParamsMaxWip.js";
import { AppContext } from "../../AppContext.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
rawStyles({
  "div#config-container p": {
    marginBottom: "1rem",
    marginTop: "1rem",
  },
});
// import updateLocastateFromGlobastate from "./updateLocastateFromGlobastate.js";
import hideOrShowConfigDivs from "./hideOrShowConfigDivs.js";
import cssStyles from "./cssStylesConfig.js";
import getRawStyles from "./getRawStyles.js";
// import dispatchStore from "./dispatchStore.js";
import changeSetting from "./changeSetting.js";

/*::
type Props = {
}
*/
export default (props /*: Props */) /*: string */ => {
  // Styles
  const [styles /*: Object */, setStyles /*: function */] = useState({});
  useEffect(() => {
    rawStyles(getRawStyles());
    setStyles(cssStyles());
  }, []);

  const [state, dispatch] = useContext(AppContext);
  // A toggle to show or hide the config
  const [configToggle, setConfigToggle] = useState(false);
  // Hide or show the config divs when the toggle changes
  const toggleConfig = () => {
    setConfigToggle(!configToggle);
  };
  // Set the config toggle to false on load
  useEffect(() => {
    setConfigToggle(false);
  }, []);
  // Hide or show the params divs when the toggle changes
  useEffect(hideOrShowConfigDivs(configToggle), [configToggle]);
  useEffect(() => {
    setTimeout(() => {
      const configIcon = document.getElementById("config-icon");
      if (configIcon) {
        configIcon.style.display = "block";
      }
    }, 20);
  }, []);
  return html`
    <div
      id="config-close-icon"
      className="${styles.configClose}"
      onClick="${toggleConfig}"
    >
      <span className="material-icons ${styles.configIcon}"> close </span>
    </div>

    <div id="config-container" className="${styles.configContainer}">
      <fieldset>
        <${Sid}
          sid=${state.sid}
          styles=${styles}
          changeSetting=${changeSetting("sid", dispatch)}
        />

        <!-------------------------------------------------------------------->
        <!-- DISPLAY TERMS -->
        <!-------------------------------------------------------------------->
        <h2 className=${styles.legend}>Display Terms</h2>

        <${DisplayNameInput}
          displayName=${state.displayName}
          changeSetting=${changeSetting("displayName", dispatch)}
        />

        <${DevUnitsTerm}
          devUnitsTerm=${state.devUnitsTerm}
          changeSetting=${changeSetting("devUnitsTerm", dispatch)}
        />

        <!-------------------------------------------------------------------->
        <!-- WORKFLOW STEPS-->
        <!-------------------------------------------------------------------->
        <h2 className=${styles.legend}>Workflow Steps</h2>

        <${NumberOfSteps}
          numberOfSteps=${state.numberOfSteps}
          changeSetting=${changeSetting("numberOfSteps", dispatch)}
        />
        <${Steps} numberOfSteps=${state.numberOfSteps} />

        <!-------------------------------------------------------------------->
        <!-- QUEUE SETTINGS -->
        <!-------------------------------------------------------------------->
        <h2 className=${styles.legend}>Queue Settings</h2>

        <div className=${styles.field}>
          <${ArrivalRate}
            arrivalRate=${state.arrivalRate}
            changeSetting=${changeSetting("arrivalRate", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="arrivalRateParam"
              name="arrivalRateParam"
              onChange=${changeSetting("arrivalRateParam", dispatch)}
              checked=${state.arrivalRateParam === true}
            />
            <label className=${
              styles.legendSub
            }for="arrivalRateParam">Editable</label>
          </div>
        </div>

        <div className=${styles.field}>
          <${TimeBox}
            timeBox=${state.timeBox}
            changeSetting=${changeSetting("timeBox", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="timeBoxParam"
              name="timeBoxParam"
              onChange=${changeSetting("timeBoxParam", dispatch)}
              checked=${state.timeBoxParam === true}
            />
            <label className=${
              styles.legendSub
            }for="timeBoxParam">Editable</label>
          </div>
        </div>

        <${FlwTimeMin}
          flwTimeMin=${state.flwTimeMin}
          changeSetting=${changeSetting("flwTimeMin", dispatch)}
        />

        <h3 className=${styles.legendH3}>Pareto Principle</h2>

        <p>
          The Pareto Principle (80/20 rule) is often applied to software development to suggest that 20% of features deliver 80% of the value that users derive from a product. Here we're extrapolating that to suggest that 20% of the work items in a workflow will deliver 80% of the value. But the 80/20 rule is always a guess. In any particular situation the actual ratio may be different, so we can change the ratio to reflect what we feel about the particular context for the workflow.
        </p>

        <div className=${styles.field}>
          <${ParetoPoint}
            paretoPoint=${state.paretoPoint}
            changeSetting=${changeSetting("paretoPoint", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="paretoPointParam"
              name="paretoPointParam"
              onChange=${changeSetting("paretoPointParam", dispatch)}
              checked=${state.paretoPointParam === true}
            />
            <label className=${
              styles.legendSub
            }for="paretoPointParam">Editable</label>
          </div>

        </div>

        <h3 className=${styles.legendH3}>Expiry Dates</h3>

        <${Death}
          death=${state.death}
          changeSetting=${changeSetting("death", dispatch)}
        />
        <div className=${styles.field}>
          <${BacklogDeath}
            backlogDeath=${state.backlogDeath}
            changeSetting=${changeSetting("backlogDeath", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="backlogDeathParam"
              name="backlogDeathParam"
              onChange=${changeSetting("backlogDeathParam", dispatch)}
              checked=${state.backlogDeathParam === true}
            />
            <label className=${
              styles.legendSub
            }for="backlogDeathParam">Editable</label>
          </div>
        </div>

        <h3 className=${styles.legendH3}>Drag</h2>

        <p>Drag from excess WIP:</p>
        <div className=${styles.field}>
          <${Drag}
            drag=${state.drag}
            changeSetting=${changeSetting("drag", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="dragParam"
              name="dragParam"
              onChange=${changeSetting("dragParam", dispatch)}
              checked=${state.dragParam === true}
            />
            <label className=${styles.legendSub}for="dragParam">Editable</label>
          </div>
        </div>
        <div className=${styles.field}>
          <${DragPoint}
            dragPoint=${state.dragPoint}
            changeSetting=${changeSetting("dragPoint", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="dragPointParam"
              name="dragPointParam"
              onChange=${changeSetting("dragPointParam", dispatch)}
              checked=${state.dragPointParam === true}
            />
            <label className=${
              styles.legendSub
            }for="dragPointParam">Editable</label>
          </div>
        </div>

        <!-------------------------------------------------------------------->
        <!-- ENABLING CONSTRAINTS -->
        <!-------------------------------------------------------------------->

        <h2 className=${styles.legend}>Enabling Constraints</h2>

        <div className=${styles.field}>
          <${FlwItmSizeLimit}
            flwItmSizeLimit=${state.flwItmSizeLimit}
            changeSetting=${changeSetting("flwItmSizeLimit", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="flwItmSizeLimitParam"
              name="flwItmSizeLimitParam"
              onChange=${changeSetting("flwItmSizeLimitParam", dispatch)}
              checked=${state.flwItmSizeLimitParam === true}
            />
            <label className=${
              styles.legendSub
            }for="flwItmSizeLimitParam">Editable</label>
          </div>
        </div>

        <div className=${styles.field}>
          <${DevUnitsMoveToWork}
            devUnitsMoveToWork=${state.devUnitsMoveToWork}
            changeSetting=${changeSetting("devUnitsMoveToWork", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="devUnitsMoveToWorkParam"
              name="devUnitsMoveToWorkParam"
              onChange=${changeSetting("devUnitsMoveToWorkParam", dispatch)}
              checked=${state.devUnitsMoveToWorkParam === true}
            />
            <label className=${
              styles.legendSub
            }for="devUnitsMoveToWorkParam">Editable</label>
          </div>
        </div>

        <h3 className=${styles.legendH3}>Unplanned Work</h2>

        <div className=${styles.field}>
          <${ExpdtQueueLength}
            expdtQueueLength=${state.expdtQueueLength}
            changeSetting=${changeSetting("expdtQueueLength", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="expdtQueueLengthParam"
              name="expdtQueueLengthParam"
              onChange=${changeSetting("expdtQueueLengthParam", dispatch)}
              checked=${state.expdtQueueLengthParam === true}
            />
            <label className=${
              styles.legendSub
            }for="expdtQueueLengthParam">Editable</label>
          </div>
        </div>
        <div className=${styles.field}>
          <${ExpdtDvUnitsFactor}
            expdtDvUnitsFactor=${state.expdtDvUnitsFactor}
            changeSetting=${changeSetting("expdtDvUnitsFactor", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="expdtDvUnitsFactorParam"
              name="expdtDvUnitsFactorParam"
              onChange=${changeSetting("expdtDvUnitsFactorParam", dispatch)}
              checked=${state.expdtDvUnitsFactorParam === true}
            />
            <label className=${
              styles.legendSub
            }for="expdtDvUnitsFactorParam">Editable</label>
          </div>
        </div>

        <!-------------------------------------------------------------------->
        <!-- UI SETTINGS -->
        <!-------------------------------------------------------------------->

        <h2 className=${styles.legend}>UI Settings</h2>

        <${ParamsMaxWip}
          paramsMaxWip=${state.paramsMaxWip}
          changeSetting=${changeSetting("paramsMaxWip", dispatch)}
        />
        <div className=${styles.field}>
          <${Fps}
            fps=${state.fps}
            changeSetting=${changeSetting("fps", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="fpsParam"
              name="fpsParam"
              onChange=${changeSetting("fpsParam", dispatch)}
              checked=${state.fpsParam === true}
            />
            <label className=${styles.legendSub}for="fpsParam">Editable</label>
          </div>
        </div>
        <${ScaleCm}
          scaleCm=${state.scaleCm}
          changeSetting=${changeSetting("scaleCm", dispatch)}
        />

        <p>
          "Range" settings for the cube spread/clumping display at each step.
        </p>

        <${RangeMax}
          rangeMax=${state.rangeMax}
          changeSetting=${changeSetting("rangeMax", dispatch)}
        />
        <${RangeIncreaseRate}
          rangeIncreaseRate=${state.rangeIncreaseRate}
          changeSetting=${changeSetting("rangeIncreaseRate", dispatch)}
        />
        <${RangeMidpoint}
          rangeMidpoint=${state.rangeMidpoint}
          changeSetting=${changeSetting("rangeMidpoint", dispatch)}
        />

        <!-------------------------------------------------------------------->
        <!-- TUNING -->
        <!-------------------------------------------------------------------->

        <h2 className=${styles.legend}>Tuning</h2>

        <div className=${styles.field}>
          <${DevPowerFix}
            devPowerFix=${state.devPowerFix}
            changeSetting=${changeSetting("devPowerFix", dispatch)}
          />
          <div className=${styles.checkboxContainer}>
            <input
              type="checkbox"
              className=${styles.editableCheckbox}
              id="devPowerFixParam"
              name="devPowerFixParam"
              onChange=${changeSetting("devPowerFixParam", dispatch)}
              checked=${state.devPowerFixParam === true}
            />
            <label className=${
              styles.legendSub
            }for="devPowerFixParam">Editable</label>
          </div>
        </div>
      </fieldset>
    </div>
    <div
      id="config-icon"
      className="${styles.config}"
      onClick="${toggleConfig}"
    >
      <span className="material-icons ${styles.configIcon}"> tune </span>
    </div>
  `;
};
