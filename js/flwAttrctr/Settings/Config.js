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
import Sid from "./Sid.js";
import Steps from "./Steps.js";
import NumberOfSteps from "./NumberOfSteps.js";
import ParamsMaxWip from "./ParamsMaxWip.js";
import { AppContext } from "../../AppContext.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
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
        <!------------------------------------------------------------------>
        <!-- SESSION -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Session</div>
        <!-------------------------------------------------------------------->
        <!-- Auto Mode -->
        <!-------------------------------------------------------------------->
        <${AutoMode}
          autoMode=${state.autoMode}
          styles=${styles}
          changeSetting=${changeSetting("autoMode", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- Easy Storage -->
        <!-------------------------------------------------------------------->
        <${EasyStorage}
          easyStorage=${state.easyStorage}
          styles=${styles}
          changeSetting=${changeSetting("easyStorage", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- SID -->
        <!-------------------------------------------------------------------->
        <${Sid}
          sid=${state.sid}
          styles=${styles}
          changeSetting=${changeSetting("sid", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- DisplayName -->
        <!-------------------------------------------------------------------->
        <${DisplayNameInput}
          displayName=${state.displayName}
          changeSetting=${changeSetting("displayName", dispatch)}
        />
        <!------------------------------------------------------------------>
        <!-- DISPLAY -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Display</div>
        <!-------------------------------------------------------------------->
        <!-- fps -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="fpsParam"
            name="fpsParam"
            onChange=${changeSetting("fpsParam", dispatch)}
            checked=${state.fpsParam === true}
          />
          <label for="fpsParam">Make this an editable parameter</label>
        </div>
        <${Fps}
          fps=${state.fps}
          changeSetting=${changeSetting("fps", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- ScaleCm -->
        <!-------------------------------------------------------------------->
        <${ScaleCm}
          scaleCm=${state.scaleCm}
          changeSetting=${changeSetting("scaleCm", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- Range Max. -->
        <!-------------------------------------------------------------------->
        <${RangeMax}
          rangeMax=${state.rangeMax}
          changeSetting=${changeSetting("rangeMax", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- Range Increase Rate -->
        <!-------------------------------------------------------------------->
        <${RangeIncreaseRate}
          rangeIncreaseRate=${state.rangeIncreaseRate}
          changeSetting=${changeSetting("rangeIncreaseRate", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- Range Decrease Rate -->
        <!-------------------------------------------------------------------->
        <${RangeMidpoint}
          rangeMidpoint=${state.rangeMidpoint}
          changeSetting=${changeSetting("rangeMidpoint", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- DevUnitsTerm -->
        <!-------------------------------------------------------------------->
        <${DevUnitsTerm}
          devUnitsTerm=${state.devUnitsTerm}
          changeSetting=${changeSetting("devUnitsTerm", dispatch)}
        />
        <!------------------------------------------------------------------>
        <!-- GLOBAL FLOW -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Global Flow</div>
        <!-------------------------------------------------------------------->
        <!-- DevPowerFix -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="devPowerFixParam"
            name="devPowerFixParam"
            onChange=${changeSetting("devPowerFixParam", dispatch)}
            checked=${state.devPowerFixParam === true}
          />
          <label for="devPowerFixParam">Make this an editable parameter</label>
        </div>
        <${DevPowerFix}
          devPowerFix=${state.devPowerFix}
          changeSetting=${changeSetting("devPowerFix", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- Drag -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="dragParam"
            name="dragParam"
            onChange=${changeSetting("dragParam", dispatch)}
            checked=${state.dragParam === true}
          />
          <label for="dragParam">Make this an editable parameter</label>
        </div>
        <${Drag}
          drag=${state.drag}
          changeSetting=${changeSetting("drag", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- DragPoint -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="dragPointParam"
            name="dragPointParam"
            onChange=${changeSetting("dragPointParam", dispatch)}
            checked=${state.dragPointParam === true}
          />
          <label for="dragPointParam">Make this an editable parameter</label>
        </div>
        <${DragPoint}
          dragPoint=${state.dragPoint}
          changeSetting=${changeSetting("dragPoint", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- ParetoPoint -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="paretoPointParam"
            name="paretoPointParam"
            onChange=${changeSetting("paretoPointParam", dispatch)}
            checked=${state.paretoPointParam === true}
          />
          <label for="paretoPointParam">Make this an editable parameter</label>
        </div>
        <${ParetoPoint}
          paretoPoint=${state.paretoPoint}
          changeSetting=${changeSetting("paretoPoint", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- ArrivalRate -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="arrivalRateParam"
            name="arrivalRateParam"
            onChange=${changeSetting("arrivalRateParam", dispatch)}
            checked=${state.arrivalRateParam === true}
          />
          <label for="arrivalRateParam">Make this an editable parameter</label>
        </div>
        <${ArrivalRate}
          arrivalRate=${state.arrivalRate}
          changeSetting=${changeSetting("arrivalRate", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- Flow Item Size Min -->
        <!-------------------------------------------------------------------->
        <${FlwTimeMin}
          flwTimeMin=${state.flwTimeMin}
          changeSetting=${changeSetting("flwTimeMin", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- timeBox -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="timeBoxParam"
            name="timeBoxParam"
            onChange=${changeSetting("timeBoxParam", dispatch)}
            checked=${state.timeBoxParam === true}
          />
          <label for="timeBoxParam">Make this an editable parameter</label>
        </div>
        <${TimeBox}
          timeBox=${state.timeBox}
          changeSetting=${changeSetting("timeBox", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- expdtQueueLength -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="expdtQueueLengthParam"
            name="expdtQueueLengthParam"
            onChange=${changeSetting("expdtQueueLengthParam", dispatch)}
            checked=${state.expdtQueueLengthParam === true}
          />
          <label for="expdtQueueLengthParam"
            >Make this an editable parameter</label
          >
        </div>
        <${ExpdtQueueLength}
          expdtQueueLength=${state.expdtQueueLength}
          changeSetting=${changeSetting("expdtQueueLength", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- expdtDvUnitsFactor -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="expdtDvUnitsFactorParam"
            name="expdtDvUnitsFactorParam"
            onChange=${changeSetting("expdtDvUnitsFactorParam", dispatch)}
            checked=${state.expdtDvUnitsFactorParam === true}
          />
          <label for="expdtDvUnitsFactorParam"
            >Make this an editable parameter</label
          >
        </div>
        <${ExpdtDvUnitsFactor}
          expdtDvUnitsFactor=${state.expdtDvUnitsFactor}
          changeSetting=${changeSetting("expdtDvUnitsFactor", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- Death -->
        <!-------------------------------------------------------------------->
        <${Death}
          death=${state.death}
          changeSetting=${changeSetting("death", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- BacklogDeath -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="backlogDeathParam"
            name="backlogDeathParam"
            onChange=${changeSetting("backlogDeathParam", dispatch)}
            checked=${state.backlogDeathParam === true}
          />
          <label for="backlogDeathParam">Make this an editable parameter</label>
        </div>
        <${BacklogDeath}
          backlogDeath=${state.backlogDeath}
          changeSetting=${changeSetting("backlogDeath", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- flwItmSizeLimit -->
        <!-------------------------------------------------------------------->
        <div>
          <input
            type="checkbox"
            id="flwItmSizeLimitParam"
            name="flwItmSizeLimitParam"
            onChange=${changeSetting("flwItmSizeLimitParam", dispatch)}
            checked=${state.flwItmSizeLimitParam === true}
          />
          <label for="flwItmSizeLimitParam"
            >Make this an editable parameter</label
          >
        </div>
        <${FlwItmSizeLimit}
          flwItmSizeLimit=${state.flwItmSizeLimit}
          changeSetting=${changeSetting("flwItmSizeLimit", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- NumberOfSteps -->
        <!-------------------------------------------------------------------->
        <${NumberOfSteps}
          numberOfSteps=${state.numberOfSteps}
          changeSetting=${changeSetting("numberOfSteps", dispatch)}
        />
        <!------------------------------------------------------------------>
        <!-- PARAMS UI -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Parameters UI</div>
        <!-------------------------------------------------------------------->
        <!-- Params Max WIP -->
        <!-------------------------------------------------------------------->
        <${ParamsMaxWip}
          paramsMaxWip=${state.paramsMaxWip}
          changeSetting=${changeSetting("paramsMaxWip", dispatch)}
        />
        <!------------------------------------------------------------------>
        <!-- STEPS-->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Steps</div>
        <${Steps} numberOfSteps=${state.numberOfSteps} />
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
