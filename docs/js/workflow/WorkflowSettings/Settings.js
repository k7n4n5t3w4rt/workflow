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
import FlwTimeMax from "./FlwTimeMax.js";
import StrtAvrgFlwTime from "./StrtAvrgFlwTime.js";
import DevUnits from "./DevUnits.js";
import Drag from "./Drag.js";
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
  useEffect(hideOrShowSettingsDivs(settingsToggle), [settingsToggle]);
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
    <div
      id="settings-close-icon"
      className="${styles.settingsClose}"
      onClick="${toggleSettings}"
    >
      <span className="material-icons ${styles.settingsIcon}"> close </span>
    </div>
    <div id="settings-container" className="${styles.settingsContainer}">
      <fieldset>
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
        <!-- showMetrics -->
        <!-------------------------------------------------------------------->
        <!--
        <${ShowMetrics}
          showMetrics=${lState.showMetrics}
          styles=${styles}
          changeSetting=${changeSetting("showMetrics", setStateFunctions)}
        />
        -->
        <!-------------------------------------------------------------------->
        <!-- debug -->
        <!-------------------------------------------------------------------->
        <!--
        <${Debug}
          debug=${lState.debug}
          styles=${styles}
          changeSetting=${changeSetting("debug", setStateFunctions)}
        />
        -->
        <!-------------------------------------------------------------------->
        <!-- dfntnOfReady -->
        <!-------------------------------------------------------------------->
        <!--
        <${DfntnOfReady}
          dfntnOfReady=${lState.dfntnOfReady}
          styles=${styles}
          changeSetting=${changeSetting("dfntnOfReady", setStateFunctions)}
        />
        -->
        <!-------------------------------------------------------------------->
        <!-- ArrivalRate -->
        <!-------------------------------------------------------------------->
        <${ArrivalRate}
          arrivalRate=${lState.arrivalRate}
          changeSetting=${changeSetting("arrivalRate", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Start Average Flow Time -->
        <!-------------------------------------------------------------------->
        <${StrtAvrgFlwTime}
          strtAvrgFlwTime=${lState.strtAvrgFlwTime}
          changeSetting=${changeSetting("strtAvrgFlwTime", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Flow Item Size Max -->
        <!-------------------------------------------------------------------->
        <${FlwTimeMax}
          flwTimeMax=${lState.flwTimeMax}
          changeSetting=${changeSetting("flwTimeMax", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Flow Item Size Min -->
        <!-------------------------------------------------------------------->
        <${FlwTimeMin}
          flwTimeMin=${lState.flwTimeMin}
          changeSetting=${changeSetting("flwTimeMin", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- Dev Units -->
        <!-------------------------------------------------------------------->
        <!--
        <${DevUnits}
          devUnits=${lState.devUnits}
          changeSetting=${changeSetting("devUnits", setStateFunctions)}
        />
        -->
        <!-------------------------------------------------------------------->
        <!-- Drag -->
        <!-------------------------------------------------------------------->
        <!--
        <${Drag}
          drag=${lState.drag}
          changeSetting=${changeSetting("drag", setStateFunctions)}
        />
        -->
        <!-------------------------------------------------------------------->
        <!-- timeBox -->
        <!-------------------------------------------------------------------->
        <${TimeBox}
          timeBox=${lState.timeBox}
          changeSetting=${changeSetting("timeBox", setStateFunctions)}
        />
        <!-------------------------------------------------------------------->
        <!-- fps -->
        <!-------------------------------------------------------------------->
        <${Fps}
          fps=${lState.fps}
          changeSetting=${changeSetting("fps", setStateFunctions)}
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
        <!-------------------------------------------------------------------->
        <!-- specialisation -->
        <!-------------------------------------------------------------------->
        <!-------------------------------------------------------------------->
        <!-- teamInstability -->
        <!-------------------------------------------------------------------->
        <!-------------------------------------------------------------------->
        <!-- Death -->
        <!-------------------------------------------------------------------->
        <!--
        <${Death} death=${lState.death} changeSetting=${changeSetting(
          "death",
          setStateFunctions,
        )} />
        -->
        <!-------------------------------------------------------------------->
        <!-- BacklogDeath -->
        <!-------------------------------------------------------------------->
        <!--
        <${BacklogDeath}
          backlogDeath=${lState.backlogDeath}
          changeSetting=${changeSetting("backlogDeath", setStateFunctions)}
        />
        -->
        <!-------------------------------------------------------------------->
        <!-- flwItmSizeLimit -->
        <!-------------------------------------------------------------------->
        <${FlwItmSizeLimit}
          flwItmSizeLimit=${lState.flwItmSizeLimit}
          changeSetting=${changeSetting("flwItmSizeLimit", setStateFunctions)}
        />
      </fieldset>
    </div>
    <div
      id="settings-icon"
      className="${styles.settings}"
      onClick="${toggleSettings}"
    >
      <span className="material-icons ${styles.settingsIcon}"> settings </span>
    </div>
  `;
};