// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
// --------------------------------------------------
// PREACT
// --------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";
import Globals from "../globals.js";

setSeed(seedString("threebubblesortparams"));

const [styles] = createStyles({
  paramsContainer: {
    position: "absolute",
    zIndex: "10000",
    boxSizing: "border-box",
    width: "100%",
    height: "30%",
    padding: "1rem",
    paddingTop: "3rem",
  },
});

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
  ["input[type=text]"]: {
    boxSizing: "border-box !important",
    backgroundColor: "white !important",
    padding: "0.5rem !important",
  },
});

/*::
type Props = {
	cols: number,
	rows: number,
	speed: number,
	scaleX: number,
	scaleY: number,
	scaleZ: number,
	dispatch: function
}
*/
export default (props /*: Props */) /*: string */ => {
  // Set some defaults for missing props
  const speed /*: number */ = props.speed;
  const dispatch /*: function */ = props.dispatch;

  useEffect(() => {});

  const changeCols = (
    dispatch /*: function */,
    param /*: string */,
  ) /*: function */ => (
    e /*: SyntheticInputEvent<HTMLInputElement> */,
  ) /*: void */ => {
    // Set the Globals for use in real-time, non-Preact JS
    Globals()[param] = e.target.value;
    dispatch({
      type: "CHANGE_PARAM",
      payload: { param, value: e.target.value },
    });
  };

  return html`
    <div id="params-container" className="${styles.paramsContainer}">
      <fieldset>
        <div>
          <label for="speed">Speed:</label>
          <output id="speedOutput" name="speedOutput" for="speed"
            >${speed.toString()}</output
          >
          <input
            type="range"
            id="speed"
            name="speed"
            min="1"
            max="10"
            step="1"
            onChange=${changeCols(dispatch, "speed")}
            value="${speed.toString()}"
          />
        </div>
      </fieldset>
    </div>
  `;
};
