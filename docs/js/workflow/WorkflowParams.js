// @flow
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
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
import gSttngs from "./actions/gSttngs.js";

/*::
type Props = {
	fps: number,
	dispatch: function
}
*/
export default (props /*: Props */) /*: string */ => {
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // Set some defaults for missing props
  const setStateFunctions = {};
  const [fps, setFps] = useState(props.fps);
  setStateFunctions["fps"] = setFps;
  const [paramToggle, setParamToggle] = useState(false);

  useEffect(hideOrShowParamsDivs(paramToggle), [paramToggle]);

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
    <div id="params-container" className="${styles.paramsContainer}">
      <fieldset>
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
// hideOrShowParamsDiv()
//------------------------------------------------------------------
const hideOrShowParamsDivs =
  (paramToggle /*: boolean */) /*: () => void */ => () /* void */ => {
    const paramsContainer = document.getElementById("params-container");
    const settingsIcon = document.getElementById("settings-icon");
    const settingsCloseIcon = document.getElementById("settings-close-icon");
    if (
      paramsContainer !== null &&
      settingsIcon !== null &&
      settingsCloseIcon !== null
    ) {
      if (paramToggle === true) {
        paramsContainer.style.display = "block";
        settingsIcon.style.display = "none";
        settingsCloseIcon.style.display = "block";
      } else {
        paramsContainer.style.display = "none";
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
  setSeed(seedString("flwparams"));

  const [styles] = createStyles({
    paramsContainer: {
      position: "absolute",
      zIndex: "10000",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      padding: "1rem",
      paddingTop: "3rem",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    settings: {
      position: "absolute",
      zIndex: "10000",
      boxSizing: "border-box",
      bottom: ".4rem",
      right: ".4rem",
      cursor: "pointer",
    },
    settingsIcon: {
      fontSize: "54px",
      color: "white",
    },
    settingsClose: {
      position: "absolute",
      zIndex: "20000",
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
