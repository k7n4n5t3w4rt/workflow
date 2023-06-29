// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./actions/gSttngs.js";
import gState from "./actions/gState.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import {
  isParsableAsNumber,
  isParsableAsBoolean,
  isParsableAsArray,
} from "./actions/isParsable.js";
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";

/*::
type Props = {
	arrivalNumber: number,
  setArrivalRate: function,
	drag: number,
  setDrag: function,
	dispatch: function
}
*/
export default (props /*: Props */) /*: string */ => {
  const styles = cssStyles();
  rawStyles(getRawStyles());
  const [paramToggle, setParamToggle] = useState(false);
  //----------------------------------------
  // IN
  //----------------------------------------
  const setStateFunctions = {};
  const [arrivalNumber, setArrivalRate] = useState(1);
  setStateFunctions["arrivalNumber"] = setArrivalRate;
  const [devUnits, setDevUnits] = useState(1);
  setStateFunctions["devUnits"] = setDevUnits;
  const [drag, setDrag] = useState(0);
  setStateFunctions["drag"] = setDrag;
  const [devCapacityAvailable, setDevPower] = useState(1);
  setStateFunctions["devCapacityAvailable"] = setDevPower;
  const [autoMode, setAutoMode] = useState(false);
  setStateFunctions["autoMode"] = setAutoMode;
  //----------------------------------------
  // OUT
  //----------------------------------------
  const [flwItmSizeMin, setFlwItmSizeMin] = useState(1);
  setStateFunctions["flwItmSizeMin"] = setFlwItmSizeMin;
  const [flwItmSizeMax, setFlwItmSizeMax] = useState(1);
  setStateFunctions["flwItmSizeMax"] = setFlwItmSizeMax;
  const [timeBox, setTimeBox] = useState(10);
  setStateFunctions["timeBox"] = setTimeBox;
  const [death, setDeath] = useState(0);
  setStateFunctions["death"] = setDeath;
  const [backlogDeath, setBacklogDeath] = useState(0);
  setStateFunctions["backlogDeath"] = setBacklogDeath;
  const [backlogMax, setBacklogMax] = useState(2);
  setStateFunctions["backlogMax"] = setBacklogMax;
  const [arrivalFrequency, setArrivalFrequency] = useState(1);
  setStateFunctions["arrivalFrequency"] = setArrivalFrequency;
  const [flwItmSizeFactor, setFlwItmSizeFactor] = useState(1);
  setStateFunctions["flwItmSizeFactor"] = setFlwItmSizeFactor;
  const [dfntnOfReady, setDfntnOfReady] = useState(0);
  setStateFunctions["dfntnOfReady"] = setDfntnOfReady;
  const [specialisation, setSpecialisation] = useState(0);
  setStateFunctions["specialisation"] = setSpecialisation;
  const [teamInstability, setTeamInstability] = useState(0);
  setStateFunctions["teamInstability"] = setTeamInstability;
  // Boolean
  const [showMetrics, setShowMetrics] = useState(true);
  setStateFunctions["showMetrics"] = setShowMetrics;
  const [debug, setDebug] = useState(false);
  setStateFunctions["debug"] = setDebug;
  //----------------------------------------
  // PARAMS
  //----------------------------------------
  const [fps, setFps] = useState(1);
  setStateFunctions["fps"] = setFps;
  const [expdtQueueLength, setExpdtLimit] = useState(0);
  setStateFunctions["expdtQueueLength"] = setExpdtLimit;
  const [wipLimitEachStep, setWipLimit] = useState(0);
  setStateFunctions["wipLimitEachStep"] = setWipLimit;
  const [expdtdDvUnitsFactor, setExpdtdDvUnitsFactor] = useState(1);
  setStateFunctions["expdtdDvUnitsFactor"] = setExpdtdDvUnitsFactor;

  useEffect(() => {
    //----------------------------------------
    // IN
    //----------------------------------------
    setArrivalRate(gSttngs().get("arrivalNumber"));
    setDrag(gSttngs().get("drag"));
    setDevUnits(gSttngs().get("devUnits"));
    setDevPower(gSttngs().get("devCapacityAvailable"));
    setAutoMode(gSttngs().get("autoMode"));
    //----------------------------------------
    // OUT
    //----------------------------------------
    setFlwItmSizeMin(gSttngs().get("flwItmSizeMin"));
    setFlwItmSizeMax(gSttngs().get("flwItmSizeMax"));
    setTimeBox(gSttngs().get("timeBox"));
    setDeath(gSttngs().get("death"));
    setBacklogDeath(gSttngs().get("backlogDeath"));
    setBacklogMax(gSttngs().get("backlogMax"));
    setArrivalFrequency(gSttngs().get("arrivalFrequency"));
    setFlwItmSizeFactor(gSttngs().get("flwItmSizeFactor"));
    setDfntnOfReady(gSttngs().get("dfntnOfReady"));
    setSpecialisation(gSttngs().get("specialisation"));
    setTeamInstability(gSttngs().get("teamInstability"));
    // Boolean
    setShowMetrics(gSttngs().get("showMetrics"));
    setDebug(gSttngs().get("debug"));
    //----------------------------------------
    // PARAMS
    //----------------------------------------
    setFps(gSttngs().get("fps"));
    setExpdtLimit(gSttngs().get("expdtQueueLength"));
    setWipLimit(gSttngs().get("wipLimitEachStep"));
    setExpdtdDvUnitsFactor(gSttngs().get("expdtdDvUnitsFactor"));
  }, []);

  useEffect(hideOrShowSettingsDivs(paramToggle), [paramToggle]);

  const toggleParam = () => {
    setParamToggle(!paramToggle);
  };

  const changeParam =
    (param /*: string */) /*: function */ =>
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
      gSttngs().set(param, value);
      setStateFunctions[param](value);
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
        <!-- Arrival Rate -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="arrivalNumber">Arrival Rate:</label>
          <output
            id="arrivalNumberOutput"
            name="arrivalNumberOutput"
            for="arrivalNumber"
            >${arrivalNumber.toString()}</output
          >
          <input
            type="range"
            id="arrivalNumber"
            name="arrivalNumber"
            min="0"
            max="50"
            step="1"
            onChange=${changeParam("arrivalNumber")}
            value="${arrivalNumber.toString()}"
          />
        </div>
        <!-------------------------------------------------------------------->
        <!-- Dev Units -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="devUnits">Dev Units:</label>
          <output id="devUnitsOutput" name="devUnitsOutput" for="devUnits"
            >${devUnits.toString()}</output
          >
          <input
            type="range"
            id="devUnits"
            name="devUnits"
            min="1"
            max="50"
            step="1"
            onChange=${changeParam("devUnits")}
            value="${devUnits.toString()}"
          />
        </div>
        <!-------------------------------------------------------------------->
        <!-- DevPower -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="devCapacityAvailable">Dev. Power:</label>
          <output
            id="devCapacityAvailableOutput"
            name="devCapacityAvailableOutput"
            for="devCapacityAvailable"
            >${devCapacityAvailable.toString()}</output
          >
          <input
            type="range"
            id="devCapacityAvailable"
            name="devCapacityAvailable"
            min="0"
            max="1"
            step="0.05"
            onChange=${changeParam("devCapacityAvailable")}
            value="${devCapacityAvailable.toString()}"
          />
        </div>
        <!-------------------------------------------------------------------->
        <!-- Drag -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="drag">Drag:</label>
          <output id="dragOutput" name="dragOutput" for="drag"
            >${drag.toString()}</output
          >
          <input
            type="range"
            id="drag"
            name="drag"
            min="0"
            max="1"
            step="0.05"
            onChange=${changeParam("drag")}
            value="${drag.toString()}"
          />
        </div>
        <!-------------------------------------------------------------------->
        <!-- Auto Mode -->
        <!-------------------------------------------------------------------->
        <div>
          <div className="${styles.inputHeading}">Automode:</div>
          <label for="autoModeTrue">
            ${autoMode === true &&
            html`<input
              type="radio"
              id="autoModeTrue"
              name="autoMode"
              value="true"
              onChange=${changeParam("autoMode")}
              checked
            />`}
            ${autoMode === false &&
            html`<input
              type="radio"
              id="autoModeTrue"
              name="autoMode"
              value="true"
              onChange=${changeParam("autoMode")}
            />`}
            <span>True</span>
          </label>
          <label for="autoModeFalse">
            ${autoMode === false &&
            html`
              <input
                type="radio"
                id="autoModeFalse"
                name="autoMode"
                value="false"
                onChange=${changeParam("autoMode")}
                checked
              />
            `}
            ${autoMode === true &&
            html`
              <input
                type="radio"
                id="autoModeFalse"
                name="autoMode"
                value="false"
                onChange=${changeParam("autoMode")}
              />
            `}
            <span>false</span>
          </label>
        </div>
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
      padding: "1rem",
      paddingTop: "3rem",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
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
      float: "left",
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
    },
    ["input[type=range]"]: {},
  });

  return rawStyles;
};
