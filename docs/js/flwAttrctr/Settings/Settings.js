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
import AutoMode from "./AutoMode.js";
import Debug from "./Debug.js";
import DevPowerFix from "./DevPowerFix.js";
import DevUnits from "./DevUnits.js";
import DfntnOfReady from "./DfntnOfReady.js";
import Drag from "./Drag.js";
import EasyStorage from "./EasyStorage.js";
import ExpdtDvUnitsFactor from "./ExpdtDvUnitsFactor.js";
import ExpdtQueueLength from "./ExpdtQueueLength.js";
import FlwItmSizeLimit from "./FlwItmSizeLimit.js";
import FlwTimeMin from "./FlwTimeMin.js";
import Fps from "./Fps.js";
import NumberOfSteps from "./NumberOfSteps.js";
import ParamsMaxWip from "./ParamsMaxWip.js";
import ParetoPoint from "./ParetoPoint.js";
import RangeIncreaseRate from "./RangeIncreaseRate.js";
import RangeMax from "./RangeMax.js";
import RangeMidpoint from "./RangeMidpoint.js";
import ScaleCm from "./ScaleCm.js";
import ShowMetrics from "./ShowMetrics.js";
import Steps from "./Steps.js";
import TimeBox from "./TimeBox.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
import changeSetting from "./changeSetting.js";
import cssStyles from "./cssStylesSettings.js";
import getRawStyles from "./getRawStyles.js";
import hideOrShowSettingsDivs from "./hideOrShowSettingsDivs.js";
import setStateFunctionsStore from "./setStateFunctionsStore.js";
import updateLocalStateFromGlobalState from "./updateLocalStateFromGlobalState.js";

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

  useEffect(() => {
    setSettingsToggle(false);
  }, []);

  // Hide or show the params divs when the toggle changes
  useEffect(hideOrShowSettingsDivs(settingsToggle), [settingsToggle]);
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
