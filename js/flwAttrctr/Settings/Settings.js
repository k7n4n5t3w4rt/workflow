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
import AutoMode from "./AutoMode.js";
import Debug from "./Debug.js";
import DevPowerFix from "./DevPowerFix.js";
import DfntnOfReady from "./DfntnOfReady.js";
import Drag from "./Drag.js";
import DragPoint from "./DragPoint.js";
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
import { AppContext } from "../../AppContext.js";

//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
import changeSetting from "./changeSetting.js";
import cssStyles from "./cssStylesSettings.js";
import getRawStyles from "./getRawStyles.js";
import hideOrShowSettingsDivs from "./hideOrShowSettingsDivs.js";

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
  // A toggle to show or hide the settings
  const [settingsToggle, setSettingsToggle] = useState(false);
  // Hide or show the settings divs when the toggle changes
  const toggleSettings = () => {
    setSettingsToggle(!settingsToggle);
  };
  // // Set the settings toggle to false on load
  // useEffect(() => {
  //   setSettingsToggle(false);
  // }, []);
  // Hide or show the params divs when the toggle changes
  useEffect(hideOrShowSettingsDivs(settingsToggle), [settingsToggle]);
  useEffect(() => {
    setTimeout(() => {
      hideSettingsIconOnLoad();
    }, 100);
  }, []);
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
        ${state.devPowerFixParam === true &&
        html`
          <!-------------------------------------------------------------------->
          <!-- DevPowerFix -->
          <!-------------------------------------------------------------------->
          <div className="${styles.inputHeading}">DevPower Fix</div>
          <${DevPowerFix}
            devPowerFix=${state.devPowerFix}
            changeSetting=${changeSetting("devPowerFix", dispatch)}
          />
        `}
        ${(state.dragParam === true || state.dragPointParam === true) &&
        html`
          <!------------------------------------------------------------------>
          <!-- DRAG -->
          <!------------------------------------------------------------------>
          <div className="${styles.inputHeading}">Drag Factor</div>
          ${state.dragParam === true &&
          html`
            <${Drag}
              drag=${state.drag}
              changeSetting=${changeSetting("drag", dispatch)}
            />
          `}
          ${state.dragPointParam === true &&
          html`
            <${DragPoint}
              dragPoint=${state.dragPoint}
              changeSetting=${changeSetting("dragPoint", dispatch)}
            />
          `}
        `}
        ${state.paretoPointParam === true &&
        html`
          <!------------------------------------------------------------------>
          <!-- PARETO POINT -->
          <!------------------------------------------------------------------>
          <div className="${styles.inputHeading}">Pereto Point</div>
          <!-------------------------------------------------------------------->
          <!-- ParetoPoint -->
          <!-------------------------------------------------------------------->
          <${ParetoPoint}
            paretoPoint=${state.paretoPoint}
            changeSetting=${changeSetting("paretoPoint", dispatch)}
          />
        `}
        ${state.timeBoxParam === true &&
        html`
          <!------------------------------------------------------------------>
          <!-- TIMEBOX -->
          <!------------------------------------------------------------------>
          <div className="${styles.inputHeading}">TimeBox</div>
          <!-------------------------------------------------------------------->
          <!-- timeBox -->
          <!-------------------------------------------------------------------->
          <${TimeBox}
            timeBox=${state.timeBox}
            changeSetting=${changeSetting("timeBox", dispatch)}
          />
        `}
        ${state.arrivalRateParam === true &&
        html`
          <!------------------------------------------------------------------>
          <!-- ARRIVAL RATE -->
          <!------------------------------------------------------------------>
          <div className="${styles.inputHeading}">Arrival Rate</div>
          <!-------------------------------------------------------------------->
          <!-- ArrivalRate -->
          <!-------------------------------------------------------------------->
          <${ArrivalRate}
            arrivalRate=${state.arrivalRate}
            changeSetting=${changeSetting("arrivalRate", dispatch)}
          />
        `}
        ${state.fpsParam === true &&
        html`
          <!------------------------------------------------------------------>
          <!-- DISPLAY -->
          <!------------------------------------------------------------------>
          <div className="${styles.inputHeading}">Display</div>
          <!-------------------------------------------------------------------->
          <!-- DISPLAY: FRAMES PER SECOND -->
          <!-------------------------------------------------------------------->
          ${state.fpsParam === true &&
          html`
            <${Fps}
              fps=${state.fps}
              changeSetting=${changeSetting("fps", dispatch)}
            />
          `}
        `}
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
//------------------------------------------------------------------
// FUNCTION: hideSettingsIconOnLoad()
//------------------------------------------------------------------
export const hideSettingsIconOnLoad = () /*: void */ => {
  const settingsIcon = document.getElementById("settings-icon");
  if (settingsIcon !== null) {
    settingsIcon.style.display = "none";
  }
};
