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
}
*/
export default (props /*: Props */) /*: string */ => {
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // Set the local state
  const [fps, setFps] = useState(1);
  const [wipLimitEachStep, setWipLimit] = useState(0);
  const [expdtQueueLength, setExpdtLimit] = useState(0);
  const [expdtDvUnitsFactor, setExpdtDvUnitsFactor] = useState(0);
  // Put the setState functions in an object so we can use them dynamically
  const setStateFunctions = {};
  setStateFunctions["fps"] = setFps;
  setStateFunctions["wipLimitEachStep"] = setWipLimit;
  setStateFunctions["expdtQueueLength"] = setExpdtLimit;
  setStateFunctions["expdtDvUnitsFactor"] = setExpdtDvUnitsFactor;
  const [paramToggle, setParamToggle] = useState(false);

  useEffect(
    setStateFromGlobalSettings(
      setFps,
      setWipLimit,
      setExpdtLimit,
      setExpdtDvUnitsFactor,
    ),
    [],
  );

  useEffect(hideOrShowParamsDivs(paramToggle), [paramToggle]);
  // useEffect(setSliderValues(props), []);

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
            min="0"
            max="1"
            step=".1"
            onChange=${changeParam("fps")}
            value="${fps.toString()}"
          />
        </div>
        <!-------------------------------------------------------------------->
        <!-- WIP Limit -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="fps">WIP Limit Each Step:</label>
          <output id="wiplimitOutput" name="wiplimitOutput" for="wiplimit"
            >${wipLimitEachStep.toString()}</output
          >
          <input
            type="range"
            id="wiplimit"
            name="wiplimit"
            min="0"
            max="100"
            step="1"
            onChange=${changeParam("wipLimitEachStep")}
            value="${wipLimitEachStep.toString()}"
          />
        </div>
        <!-------------------------------------------------------------------->
        <!-- Expedite Queue -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="expdtQueueLength">Expedite Queue:</label>
          <output
            id="expdtQueueLengthOutput"
            name="expdtQueueLengthOutput"
            for="expdtQueueLength"
            >${expdtQueueLength.toString()}</output
          >
          <input
            type="range"
            id="expdtQueueLength"
            name="expdtQueueLength"
            min="0"
            max="50"
            step="1"
            onChange=${changeParam("expdtQueueLength")}
            value="${expdtQueueLength.toString()}"
          />
        </div>
        <!-------------------------------------------------------------------->
        <!-- Expedited Dev Units Factor -->
        <!-------------------------------------------------------------------->
        <div>
          <label for="fps">Expedited Dev Units Factor:</label>
          <output
            id="expdtDvUnitsFactorOutput"
            name="expdtDvUnitsFactorOutput"
            for="expdtDvUnitsFactor"
            >${expdtDvUnitsFactor.toString()}</output
          >
          <input
            type="range"
            id="expdtDvUnitsFactor"
            name="expdtDvUnitsFactor"
            min="0"
            max="1"
            step="0.05"
            onChange=${changeParam("expdtDvUnitsFactor")}
            value="${expdtDvUnitsFactor.toString()}"
          />
        </div>
      </fieldset>
    </div>
    <div id="params-icon" className="${styles.params}" onClick="${toggleParam}">
      <span className="material-icons ${styles.paramsIcon}"> build </span>
    </div>
  `;
};

const setStateFromGlobalSettings =
  (
    setFps /*: (any) => void */,
    setWipLimit /*: (any) => void */,
    setExpdtLimit /*: (any) => void */,
    setExpdtDvUnitsFactor /*: (any) => void */,
  ) /*: () => void */ =>
  () /* void */ => {
    setFps(gSttngs().get("fps"));
    setWipLimit(gSttngs().get("wipLimitEachStep"));
    setExpdtLimit(gSttngs().get("expdtQueueLength"));
    setExpdtDvUnitsFactor(gSttngs().get("expdtDvUnitsFactor"));
    setTimeout(
      setStateFromGlobalSettings(
        setFps,
        setWipLimit,
        setExpdtLimit,
        setExpdtDvUnitsFactor,
      ),
      1000 / gSttngs().get("fps"),
    );
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
//       wiplimitSlider.value = props.wipLimitEachStep.toString();
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
