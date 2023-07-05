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
  useEffect,
  useState,
  useReducer,
} from "../../../web_modules/preact/hooks.js";
import { html } from "../../../web_modules/htm/preact.js";
import ArrivalNumber from "./ArrivalNumber.js";
import FlwItmSizeMin from "./FlwItmSizeMin.js";
import FlwItmSizeMax from "./FlwItmSizeMax.js";
import DevUnits from "./DevUnits.js";
import DevCapacityAvailable from "./DevCapacityAvailable.js";
import Drag from "./Drag.js";
import AutoMode from "./AutoMode.js";
import ShowMetrics from "./ShowMetrics.js";
import Debug from "./Debug.js";
import TimeBox from "./TimeBox.js";
import Death from "./Death.js";
import BacklogDeath from "./BacklogDeath.js";
import FlwItmSizeFactor from "./FlwItmSizeFactor.js";
import DfntnOfReady from "./DfntnOfReady.js";
import Fps from "./Fps.js";
import ExpdtQueueLength from "./ExpdtQueueLength.js";
import ExpdtDvUnitsFactor from "./ExpdtDvUnitsFactor.js";
import WipLimiitEachStep from "./WipLimitEachStep.js";
import ScaleCm from "./ScaleCm.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import {
  isParsableAsNumber,
  isParsableAsBoolean,
  isParsableAsArray,
} from "../actions/isParsable.js";
import seedString from "../../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../../web_modules/simplestyle-js.js";

/*::
type Props = {
}
*/
export default (props /*: Props */) /*: string */ => {
  const styles = cssStyles();
  rawStyles(getRawStyles());
  const [paramToggle, setParamToggle] = useState(false);
  const setStateFunctions = {};
  //----------------------------------------
  // Boolean
  //----------------------------------------
  const [autoMode, setAutoMode] = useState(false);
  setStateFunctions["autoMode"] = setAutoMode;
  // Not implemented yet
  const [showMetrics, setShowMetrics] = useState(true);
  setStateFunctions["showMetrics"] = setShowMetrics;
  const [debug, setDebug] = useState(false);
  setStateFunctions["debug"] = setDebug;
  const [dfntnOfReady, setDfntnOfReady] = useState(false);
  setStateFunctions["dfntnOfReady"] = setDfntnOfReady;
  //----------------------------------------
  // Sliders
  //----------------------------------------
  const [arrivalNumber, setArrivalNumber] = useState(1);
  setStateFunctions["arrivalNumber"] = setArrivalNumber;
  const [flwItmSizeMin, setFlwItmSizeMin] = useState(1);
  setStateFunctions["flwItmSizeMin"] = setFlwItmSizeMin;
  const [flwItmSizeMax, setFlwItmSizeMax] = useState(1);
  setStateFunctions["flwItmSizeMax"] = setFlwItmSizeMax;
  const [devUnits, setDevUnits] = useState(1);
  setStateFunctions["devUnits"] = setDevUnits;
  const [devCapacityAvailable, setDevCapacityAvailable] = useState(1);
  setStateFunctions["devCapacityAvailable"] = setDevCapacityAvailable;
  const [drag, setDrag] = useState(0);
  setStateFunctions["drag"] = setDrag;
  const [timeBox, setTimeBox] = useState(10);
  setStateFunctions["timeBox"] = setTimeBox;
  const [death, setDeath] = useState(0);
  setStateFunctions["death"] = setDeath;
  const [backlogDeath, setBacklogDeath] = useState(0);
  setStateFunctions["backlogDeath"] = setBacklogDeath;
  const [flwItmSizeFactor, setFlwItmSizeFactor] = useState(1);
  setStateFunctions["flwItmSizeFactor"] = setFlwItmSizeFactor;
  const [fps, setFps] = useState(1);
  setStateFunctions["fps"] = setFps;
  const [expdtQueueLength, setExpdtQueueLength] = useState(0);
  setStateFunctions["expdtQueueLength"] = setExpdtQueueLength;
  const [expdtDvUnitsFactor, setExpdtDvUnitsFactor] = useState(1);
  setStateFunctions["expdtDvUnitsFactor"] = setExpdtDvUnitsFactor;
  const [wipLimitEachStep, setWipLimitEachStep] = useState(0);
  setStateFunctions["wipLimitEachStep"] = setWipLimitEachStep;
  const [scaleCm, setScaleCm] = useState(10);
  setStateFunctions["scaleCm"] = setScaleCm;
  // Not implemented yet
  const [specialisation, setSpecialisation] = useState(0);
  setStateFunctions["specialisation"] = setSpecialisation;
  const [teamInstability, setTeamInstability] = useState(0);
  setStateFunctions["teamInstability"] = setTeamInstability;

  useEffect(() => {
    //----------------------------------------
    // Boolean
    //----------------------------------------
    setAutoMode(gSttngs().get("autoMode"));
    // Not implimented yet
    setShowMetrics(gSttngs().get("showMetrics"));
    setDebug(gSttngs().get("debug"));
    setDfntnOfReady(gSttngs().get("dfntnOfReady"));
    //----------------------------------------
    // Sliders
    //----------------------------------------
    setArrivalNumber(gSttngs().get("arrivalNumber"));
    setFlwItmSizeMin(gSttngs().get("flwItmSizeMin"));
    setFlwItmSizeMax(gSttngs().get("flwItmSizeMax"));
    setDevUnits(gSttngs().get("devUnits"));
    setDevCapacityAvailable(gSttngs().get("devCapacityAvailable"));
    setDrag(gSttngs().get("drag"));
    setTimeBox(gSttngs().get("timeBox"));
    setDeath(gSttngs().get("death"));
    setBacklogDeath(gSttngs().get("backlogDeath"));
    setFlwItmSizeFactor(gSttngs().get("flwItmSizeFactor"));
    setFps(gSttngs().get("fps"));
    setExpdtQueueLength(gSttngs().get("expdtQueueLength"));
    setWipLimitEachStep(gSttngs().get("wipLimitEachStep"));
    setExpdtDvUnitsFactor(gSttngs().get("expdtDvUnitsFactor"));
    setScaleCm(gSttngs().get("scaleCm"));
    // Not implimented yet
    setSpecialisation(gSttngs().get("specialisation"));
    setTeamInstability(gSttngs().get("teamInstability"));
  }, []);

  useEffect(hideOrShowSettingsDivs(paramToggle), [paramToggle]);

  const toggleParam = () => {
    setParamToggle(!paramToggle);
  };

  const changeSetting =
    (setting /*: string */) /*: function */ =>
    (e /*: SyntheticInputEvent<HTMLInputElement> */) /*: void */ => {
      // Set the global param for use in real-time, non-Preact JS
      let value = e.target.value;
      if (
        isParsableAsNumber(value) ||
        isParsableAsNumber(value) ||
        isParsableAsBoolean(value) ||
        isParsableAsArray(value)
      ) {
        value = JSON.parse(value);
      }
      gSttngs().set(setting, value);
      setStateFunctions[setting](value);
    };

  return html`
    <div
      id="settings-close-icon"
      className="${styles.settingsClose}"
      onClick="${toggleParam}"
    >
      <span className="material-icons ${styles.settingsIcon}"> close </span>
    </div>
    <div id="settings-container" className="${styles.settingsContainer}">
      <fieldset>
        <!-------------------------------------------------------------------->
        <!-- Auto Mode -->
        <!-------------------------------------------------------------------->
        <${AutoMode}
          autoMode=${autoMode}
          styles=${styles}
          changeSetting=${changeSetting("autoMode")}
        />
        <!-------------------------------------------------------------------->
        <!-- showMetrics -->
        <!-------------------------------------------------------------------->
        <${ShowMetrics}
          showMetrics=${showMetrics}
          styles=${styles}
          changeSetting=${changeSetting("showMetrics")}
        />
        <!-------------------------------------------------------------------->
        <!-- debug -->
        <!-------------------------------------------------------------------->
        <${Debug}
          debug=${debug}
          styles=${styles}
          changeSetting=${changeSetting("debug")}
        />
        <!-------------------------------------------------------------------->
        <!-- dfntnOfReady -->
        <!-------------------------------------------------------------------->
        <${DfntnOfReady}
          dfntnOfReady=${dfntnOfReady}
          styles=${styles}
          changeSetting=${changeSetting("dfntnOfReady")}
        />
        <!-------------------------------------------------------------------->
        <!-- ArrivalNumber -->
        <!-------------------------------------------------------------------->
        <${ArrivalNumber}
          arrivalNumber=${arrivalNumber}
          changeSetting=${changeSetting("arrivalNumber")}
        />
        <!-------------------------------------------------------------------->
        <!-- Flow Item Size Min -->
        <!-------------------------------------------------------------------->
        <${FlwItmSizeMin}
          flwItmSizeMin=${flwItmSizeMin}
          changeSetting=${changeSetting("flwItmSizeMin")}
        />
        <!-------------------------------------------------------------------->
        <!-- Flow Item Size Max -->
        <!-------------------------------------------------------------------->
        <${FlwItmSizeMax}
          flwItmSizeMax=${flwItmSizeMax}
          changeSetting=${changeSetting("flwItmSizeMax")}
        />
        <!-------------------------------------------------------------------->
        <!-- Dev Units -->
        <!-------------------------------------------------------------------->
        <${DevUnits}
          devUnits=${devUnits}
          changeSetting=${changeSetting("devUnits")}
        />
        <!-------------------------------------------------------------------->
        <!-- Dev Capacity Available -->
        <!-------------------------------------------------------------------->
        <${DevCapacityAvailable}
          devCapacityAvailable=${devCapacityAvailable}
          changeSetting=${changeSetting("devCapacityAvailable")}
        />
        <!-------------------------------------------------------------------->
        <!-- Drag -->
        <!-------------------------------------------------------------------->
        <${Drag} drag=${drag} changeSetting=${changeSetting("drag")} />
        <!-------------------------------------------------------------------->
        <!-- timeBox -->
        <!-------------------------------------------------------------------->
        <${TimeBox}
          timeBox=${timeBox}
          changeSetting=${changeSetting("timeBox")}
        />
        <!-------------------------------------------------------------------->
        <!-- Death -->
        <!-------------------------------------------------------------------->
        <${Death} death=${death} changeSetting=${changeSetting("death")} />
        <!-------------------------------------------------------------------->
        <!-- BacklogDeath -->
        <!-------------------------------------------------------------------->
        <${BacklogDeath}
          backlogDeath=${backlogDeath}
          changeSetting=${changeSetting("backlogDeath")}
        />
        <!-------------------------------------------------------------------->
        <!-- flwItmSizeFactor -->
        <!-------------------------------------------------------------------->
        <${FlwItmSizeFactor}
          flwItmSizeFactor=${flwItmSizeFactor}
          changeSetting=${changeSetting("flwItmSizeFactor")}
        />
        <!-------------------------------------------------------------------->
        <!-- fps -->
        <!-------------------------------------------------------------------->
        <${Fps} fps=${fps} changeSetting=${changeSetting("fps")} />
        <!-------------------------------------------------------------------->
        <!-- expdtQueueLength -->
        <!-------------------------------------------------------------------->
        <${ExpdtQueueLength}
          expdtQueueLength=${expdtQueueLength}
          changeSetting=${changeSetting("expdtQueueLength")}
        />
        <!-------------------------------------------------------------------->
        <!-- expdtDvUnitsFactor -->
        <!-------------------------------------------------------------------->
        <${ExpdtDvUnitsFactor}
          expdtDvUnitsFactor=${expdtDvUnitsFactor}
          changeSetting=${changeSetting("expdtDvUnitsFactor")}
        />
        <!-------------------------------------------------------------------->
        <!-- wipLimitEachStep -->
        <!-------------------------------------------------------------------->
        <${WipLimiitEachStep}
          wipLimitEachStep=${wipLimitEachStep}
          changeSetting=${changeSetting("wipLimitEachStep")}
        />
        <!-------------------------------------------------------------------->
        <!-- ScaleCm -->
        <!-------------------------------------------------------------------->
        <${ScaleCm}
          scaleCm=${scaleCm}
          changeSetting=${changeSetting("scaleCm")}
        />
        <!-------------------------------------------------------------------->
        <!-- specialisation -->
        <!-------------------------------------------------------------------->
        <!-------------------------------------------------------------------->
        <!-- teamInstability -->
        <!-------------------------------------------------------------------->
        <!-------------------------------------------------------------------->
        <!-- steps["0"].limit -->
        <!-------------------------------------------------------------------->
      </fieldset>
    </div>
    <div
      id="settings-icon"
      className="${styles.settings}"
      onClick="${toggleParam}"
    >
      <span className="material-icons ${styles.settingsIcon}"> settings </span>
    </div>
  `;
};
//------------------------------------------------------------------
// hideOrShowSettingsDiv()
//------------------------------------------------------------------
const hideOrShowSettingsDivs =
  (paramToggle /*: boolean */) /*: () => void */ => () /* void */ => {
    const settingsContainer = document.getElementById("settings-container");
    const settingsIcon = document.getElementById("settings-icon");
    const settingsCloseIcon = document.getElementById("settings-close-icon");
    if (
      settingsContainer !== null &&
      settingsIcon !== null &&
      settingsCloseIcon !== null
    ) {
      if (paramToggle === true) {
        settingsContainer.style.display = "block";
        settingsIcon.style.display = "none";
        settingsCloseIcon.style.display = "block";
      } else {
        settingsContainer.style.display = "none";
        settingsIcon.style.display = "block";
        settingsCloseIcon.style.display = "none";
      }
    }
  };

//------------------------------------------------------------------
// cssStyles()
//------------------------------------------------------------------
const cssStyles = () /*: Object */ => {
  // A seed for getting unique class names
  setSeed(seedString("flwsettings"));

  const [styles] = createStyles({
    inputHeading: {
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
    },
    settingsContainer: {
      position: "absolute",
      zIndex: "21000",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      padding: "3rem",
      paddingBottom: "6rem",
    },
    settings: {
      position: "absolute",
      zIndex: "22000",
      boxSizing: "border-box",
      bottom: ".4rem",
      left: ".4rem",
      cursor: "pointer",
    },
    settingsIcon: {
      fontSize: "54px",
      color: "white",
    },
    settingsClose: {
      position: "absolute",
      zIndex: "23000",
      boxSizing: "border-box",
      top: ".4rem",
      right: ".4rem",
      cursor: "pointer",
    },
    settingsCloseIcon: {
      fontSize: "54px",
      color: "white",
    },
    radioContainer: {
      display: "flex",
      marginBottom: "1rem",
    },
  });

  return styles;
};

//------------------------------------------------------------------
// getRawStyles()
//------------------------------------------------------------------
const getRawStyles = () /*: Object */ => {
  rawStyles({
    output: {
      display: "block",
      float: "left",
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
    },
    label: {
      display: "block",
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
    },
    ["input[type=range]"]: {},
    fieldset: {
      display: "block",
      height: "100%",
      boxSizing: "border-box",
      overflow: "auto",
    },
  });

  return rawStyles;
};
