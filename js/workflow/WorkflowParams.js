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
    setFps(gSttngs().get("fps"));
    setWipLimit(gSttngs().get("wipLimit"));
  }, []);

  useEffect(hideOrShowParamsDivs(paramToggle), [paramToggle]);
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
      id="params-close-icon"
      className="${styles.paramsClose}"
      onClick="${toggleParam}"
    >
      <span className="material-icons ${styles.paramsIcon}"> close </span>
    </div>
    <div id="params-container" className="${styles.paramsContainer}">
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
    <div id="params-icon" className="${styles.params}" onClick="${toggleParam}">
      <span className="material-icons ${styles.paramsIcon}"> build </span>
    </div>
  `;
};

// //------------------------------------------------------------------
// // setSliderValues()
// //------------------------------------------------------------------
// const setSliderValues =
//   (props /*: Props */) /*: () => void */ => () /* void */ => {
//     //---------------------------
//     // FPS
//     //---------------------------
//     const fpsSlider = document.querySelector('input[name="fps"]');
//     /*::
//     if (!(fpsSlider instanceof HTMLInputElement)) {
//       throw new Error('element is not of type HTMLInputElement');
//     }
//   */
//     if (fpsSlider !== null) {
//       fpsSlider.value = props.fps.toString();
//     }
//     //---------------------------
//     // WIP LIMIT
//     //---------------------------
//     const wiplimitSlider = document.querySelector('input[name="wiplitmit"]');
//     /*::
//     if (!(wiplimitSlider instanceof HTMLInputElement)) {
//       throw new Error('element is not of type HTMLInputElement');
//     }
//   */
//     if (wiplimitSlider !== null) {
//       wiplimitSlider.value = props.wipLimit.toString();
//     }
//   };
//------------------------------------------------------------------
// hideOrShowParamsDiv()
//------------------------------------------------------------------
const hideOrShowParamsDivs =
  (paramToggle /*: boolean */) /*: () => void */ => () /* void */ => {
    const paramsContainer = document.getElementById("params-container");
    const paramsIcon = document.getElementById("params-icon");
    const paramsCloseIcon = document.getElementById("params-close-icon");
    if (
      paramsContainer !== null &&
      paramsIcon !== null &&
      paramsCloseIcon !== null
    ) {
      if (paramToggle === true) {
        paramsContainer.style.display = "block";
        paramsIcon.style.display = "none";
        paramsCloseIcon.style.display = "block";
      } else {
        paramsContainer.style.display = "none";
        paramsIcon.style.display = "block";
        paramsCloseIcon.style.display = "none";
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
      zIndex: "31000",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      padding: "1rem",
      paddingTop: "3rem",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    params: {
      position: "absolute",
      zIndex: "32000",
      boxSizing: "border-box",
      bottom: ".4rem",
      right: ".4rem",
      cursor: "pointer",
    },
    paramsIcon: {
      fontSize: "54px",
      color: "white",
    },
    paramsClose: {
      position: "absolute",
      zIndex: "33000",
      boxSizing: "border-box",
      top: ".4rem",
      right: ".4rem",
      cursor: "pointer",
    },
    paramsCloseIcon: {
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
