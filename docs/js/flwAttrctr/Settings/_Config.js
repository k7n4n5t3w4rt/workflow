// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "../actions/gState.js";
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
import DevUnits from "./DevUnits.js";
import DevPowerFix from "./DevPowerFix.js";
import Drag from "./Drag.js";
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
import Sid from "./Sid.js";
import Steps from "./Steps.js";
import NumberOfSteps from "./NumberOfSteps.js";
import ParamsMaxWip from "./ParamsMaxWip.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
import updateLocalStateFromGlobalState from "./updateLocalStateFromGlobalState.js";
import hideOrShowSettingsDivs from "./hideOrShowSettingsDivs.js";
import cssStyles from "./cssStylesSettings.js";
import getRawStyles from "./getRawStyles.js";
import setStateFunctionsStore from "./setStateFunctionsStore.js";
import changeSetting from "./changeSetting.js";
import changeSid from "./changeSid.js";

/*::
type Props = {
}
*/
export default (props /*: Props */) /*: string */ => {
  // Styles
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // A toggle to show or hide the settings
  const [settingsToggle, setSettingsToggle] = useState(false);
  // Hide or show the settings divs when the toggle changes
  // useEffect(hideOrShowSettingsDivs(settingsToggle), [settingsToggle]);
  // The function that toggles the settings by setting the toggle
  // to whatever it isn't
  const toggleSettings = () => {
    setSettingsToggle(!settingsToggle);
  };
  // A local state to hold the settings
  const [lState, setStateFunctions] = setStateFunctionsStore(useState);
  // Once, on load, update the local state from the global state
  useEffect(updateLocalStateFromGlobalState(setStateFunctions), []);

  return html`
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
          autoMode=${lState.autoMode}
          styles=${styles}
          changeSetting=${changeSetting("autoMode", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Easy Storage -->
        <!-------------------------------------------------------------------->
        <${EasyStorage}
          easyStorage=${lState.easyStorage}
          styles=${styles}
          changeSetting=${changeSetting("easyStorage", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- SID -->
        <!-------------------------------------------------------------------->
        <${Sid}
          sid=${lState.sid}
          styles=${styles}
          changeSid=${changeSid(setStateFunctions)}
        />
        <!------------------------------------------------------------------>
        <!-- DISPLAY -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Display</div>
        <!-------------------------------------------------------------------->
        <!-- fps -->
        <!-------------------------------------------------------------------->
        <${Fps}
          fps=${lState.fps}
          changeSetting=${changeSetting("fps", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- ScaleCm -->
        <!-------------------------------------------------------------------->
        <${ScaleCm}
          scaleCm=${lState.scaleCm}
          changeSetting=${changeSetting("scaleCm", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Range Max. -->
        <!-------------------------------------------------------------------->
        <${RangeMax}
          rangeMax=${lState.rangeMax}
          changeSetting=${changeSetting("rangeMax", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Range Increase Rate -->
        <!-------------------------------------------------------------------->
        <${RangeIncreaseRate}
          rangeIncreaseRate=${lState.rangeIncreaseRate}
          changeSetting=${changeSetting("rangeIncreaseRate", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Range Decrease Rate -->
        <!-------------------------------------------------------------------->
        <${RangeMidpoint}
          rangeMidpoint=${lState.rangeMidpoint}
          changeSetting=${changeSetting("rangeMidpoint", setStateFunctions)}
        />
        <!------------------------------------------------------------------>
        <!-- GLOBAL FLOW -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Global Flow</div>
        <!-------------------------------------------------------------------->
        <!-- DevPowerFix -->
        <!-------------------------------------------------------------------->
        <${DevPowerFix}
          devPowerFix=${lState.devPowerFix}
          changeSetting=${changeSetting("devPowerFix", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Drag -->
        <!-------------------------------------------------------------------->
        <${Drag}
          drag=${lState.drag}
          changeSetting=${changeSetting("drag", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- ParetoPoint -->
        <!-------------------------------------------------------------------->
        <${ParetoPoint}
          paretoPoint=${lState.paretoPoint}
          changeSetting=${changeSetting("paretoPoint", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- ArrivalRate -->
        <!-------------------------------------------------------------------->
        <${ArrivalRate}
          arrivalRate=${lState.arrivalRate}
          changeSetting=${changeSetting("arrivalRate", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Flow Item Size Min -->
        <!-------------------------------------------------------------------->
        <${FlwTimeMin}
          flwTimeMin=${lState.flwTimeMin}
          changeSetting=${changeSetting("flwTimeMin", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- timeBox -->
        <!-------------------------------------------------------------------->
        <${TimeBox}
          timeBox=${lState.timeBox}
          changeSetting=${changeSetting("timeBox", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- expdtQueueLength -->
        <!-------------------------------------------------------------------->
        <${ExpdtQueueLength}
          expdtQueueLength=${lState.expdtQueueLength}
          changeSetting=${changeSetting("expdtQueueLength", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- expdtDvUnitsFactor -->
        <!-------------------------------------------------------------------->
        <${ExpdtDvUnitsFactor}
          expdtDvUnitsFactor=${lState.expdtDvUnitsFactor}
          changeSetting=${changeSetting(
            "expdtDvUnitsFactor",
            setStateFunctions,
          )}
        />
        <!-------------------------------------------------------------------->
        <!-- Death -->
        <!-------------------------------------------------------------------->
        <${Death}
          death=${lState.death}
          changeSetting=${changeSetting("death", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- BacklogDeath -->
        <!-------------------------------------------------------------------->
        <${BacklogDeath}
          backlogDeath=${lState.backlogDeath}
          changeSetting=${changeSetting("backlogDeath", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- flwItmSizeLimit -->
        <!-------------------------------------------------------------------->
        <${FlwItmSizeLimit}
          flwItmSizeLimit=${lState.flwItmSizeLimit}
          changeSetting=${changeSetting("flwItmSizeLimit", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- NumberOfSteps -->
        <!-------------------------------------------------------------------->
        <${NumberOfSteps}
          numberOfSteps=${lState.numberOfSteps}
          changeSetting=${changeSetting("numberOfSteps", setStateFunctions)}
        />
        <!------------------------------------------------------------------>
        <!-- PARAMS UI -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Parameters UI</div>
        <!-------------------------------------------------------------------->
        <!-- Params Max WIP -->
        <!-------------------------------------------------------------------->
        <${ParamsMaxWip}
          paramsMaxWip=${lState.paramsMaxWip}
          changeSetting=${changeSetting("paramsMaxWip", setStateFunctions)}
        />
        <!------------------------------------------------------------------>
        <!-- STEPS-->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Steps</div>
        <${Steps} numberOfSteps=${lState.numberOfSteps} />
      </fieldset>
    </div>
  `;
};
