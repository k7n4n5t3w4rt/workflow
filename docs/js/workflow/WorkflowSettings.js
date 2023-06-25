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
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";

/*::
type Props = {
	arrivalRate: number,
  setArrivalRate: function,
	drag: number,
  setDrag: function,
	dispatch: function
}
*/
export default (props /*: Props */) /*: string */ => {
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // Set the local state
  const [expdtLimit, setExpdtLimit] = useState(0);
  const [arrivalRate, setArrivalRate] = useState(1);
  const [devUnits, setDevUnits] = useState(1);
  const [drag, setDrag] = useState(0);
  // Put the setState functions in an object so we can use them dynamically
  const setStateFunctions = {};
  setStateFunctions["expdtLimit"] = setExpdtLimit;
  setStateFunctions["arrivalRate"] = setArrivalRate;
  setStateFunctions["drag"] = setDrag;
  setStateFunctions["devUnits"] = setDevUnits;
  const [paramToggle, setParamToggle] = useState(false);

  useEffect(() => {
    setExpdtLimit(gSttngs().get("expdtLimit"));
    setArrivalRate(gSttngs().get("arrivalRate"));
    setDrag(gSttngs().get("drag"));
    setDevUnits(gSttngs().get("devUnits"));
  }, []);

  useEffect(hideOrShowSettingsDivs(paramToggle), [paramToggle]);
  // useEffect(setSliderValues(props), []);

  const toggleParam = () => {
    setParamToggle(!paramToggle);
  };

  const changeParam =
    (param /*: string */) /*: function */ =>
    (e /*: SyntheticInputEvent<HTMLInputElement> */) /*: void */ => {
      // Set the global param for use in real-time, non-Preact JS
      const value = parseFloat(e.target.value);
      gSttngs()[param] = parseFloat(value);
      setStateFunctions[param](parseFloat(value));
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
        <!-- Expedite Limit -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="expdtLimit">Expedite Limit:</label>
          <output id="expdtLimitOutput" name="expdtLimitOutput" for="expdtLimit"
            >${expdtLimit.toString()}</output
          >
          <input
            type="range"
            id="expdtLimit"
            name="expdtLimit"
            min="0"
            max="50"
            step="1"
            onChange=${changeParam("expdtLimit")}
            value="${expdtLimit.toString()}"
          />
        </div>
        <!-------------------------------------------------------------------->
        <!-- Arrival Rate -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="arrivalRate">Arrival Rate:</label>
          <output
            id="arrivalRateOutput"
            name="arrivalRateOutput"
            for="arrivalRate"
            >${arrivalRate.toString()}</output
          >
          <input
            type="range"
            id="arrivalRate"
            name="arrivalRate"
            min="0"
            max="50"
            step="1"
            onChange=${changeParam("arrivalRate")}
            value="${arrivalRate.toString()}"
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
