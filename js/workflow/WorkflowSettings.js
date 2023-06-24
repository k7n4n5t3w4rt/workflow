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
	fps: number,
  setFps: function,
	wipLimit: number,
  setWipLimit: function,
	dispatch: function
}
*/
export default (props /*: Props */) /*: string */ => {
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // Set the local state
  const [fps, setFps] = useState(1);
  console.log("fps", fps);
  const [wipLimit, setWipLimit] = useState(0);
  // Put the setState functions in an object so we can use them dynamically
  const setStateFunctions = {};
  setStateFunctions["fps"] = setFps;
  setStateFunctions["wipLimit"] = setWipLimit;
  const [paramToggle, setParamToggle] = useState(false);

  useEffect(() => {
    setFps(gSttngs().fps);
    setWipLimit(gSttngs().wipLimit);
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
      const value = parseInt(e.target.value);
      gSttngs()[param] = parseInt(value);
      setStateFunctions[param](parseInt(value));
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
        <!-- FPS -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="fps">FPS:</label>
          <output id="fpsOutput" name="fpsOutput" for="fps"
            >${fps.toString()}</output
          >
          <input
            type="range"
            id="fps"
            name="fps"
            min="1"
            max="10"
            step="1"
            onChange=${changeParam("fps")}
            value="${fps.toString()}"
          />
        </div>
        <!-------------------------------------------------------------------->
        <!-- WIP Limit -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="fps">WIP Limit:</label>
          <output id="wiplimitOutput" name="wiplimitOutput" for="wiplimit"
            >${wipLimit.toString()}</output
          >
          <input
            type="range"
            id="wiplimit"
            name="wiplimit"
            min="1"
            max="100"
            step="1"
            onChange=${changeParam("wipLimit")}
            value="${wipLimit.toString()}"
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
      zIndex: "210",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      padding: "1rem",
      paddingTop: "3rem",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    settings: {
      position: "absolute",
      zIndex: "220",
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
      zIndex: "230",
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
