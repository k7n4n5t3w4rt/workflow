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
import { AppContext } from "../../AppContext.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
// import updateLocastateFromGlobastate from "./updateLocastateFromGlobastate.js";
import hideOrShowSettingsDivs from "./hideOrShowSettingsDivs.js";
import cssStyles from "./cssStylesSettings.js";
import getRawStyles from "./getRawStyles.js";
// import dispatchStore from "./dispatchStore.js";
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
  const [state, dispatch] = useContext(AppContext);
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
          changeSid=${changeSid(dispatch)}
        />
        <!------------------------------------------------------------------>
        <!-- DISPLAY -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Display</div>
        <!-------------------------------------------------------------------->
        <!-- fps -->
        <!-------------------------------------------------------------------->
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
        <!------------------------------------------------------------------>
        <!-- GLOBAL FLOW -->
        <!------------------------------------------------------------------>
        <div className="${styles.inputHeading}">Global Flow</div>
        <!-------------------------------------------------------------------->
        <!-- DevPowerFix -->
        <!-------------------------------------------------------------------->
        <${DevPowerFix}
          devPowerFix=${state.devPowerFix}
          changeSetting=${changeSetting("devPowerFix", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- Drag -->
        <!-------------------------------------------------------------------->
        <${Drag}
          drag=${state.drag}
          changeSetting=${changeSetting("drag", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- ParetoPoint -->
        <!-------------------------------------------------------------------->
        <${ParetoPoint}
          paretoPoint=${state.paretoPoint}
          changeSetting=${changeSetting("paretoPoint", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- ArrivalRate -->
        <!-------------------------------------------------------------------->
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
        <${TimeBox}
          timeBox=${state.timeBox}
          changeSetting=${changeSetting("timeBox", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- expdtQueueLength -->
        <!-------------------------------------------------------------------->
        <${ExpdtQueueLength}
          expdtQueueLength=${state.expdtQueueLength}
          changeSetting=${changeSetting("expdtQueueLength", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- expdtDvUnitsFactor -->
        <!-------------------------------------------------------------------->
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
        <${BacklogDeath}
          backlogDeath=${state.backlogDeath}
          changeSetting=${changeSetting("backlogDeath", dispatch)}
        />
        <!-------------------------------------------------------------------->
        <!-- flwItmSizeLimit -->
        <!-------------------------------------------------------------------->
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
  `;
};
