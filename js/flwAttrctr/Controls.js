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
  useContext,
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
import { AppContext } from "../AppContext.js";
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

setSeed(seedString("flwcontrols"));

const [styles] = createStyles({
  controls: {
    position: "absolute",
    zIndex: "10500",
    boxSizing: "border-box",
    bottom: "0.5rem",
    left: "0.5rem",
    cursor: "pointer",
  },
  controlsIcon: {
    fontSize: "54px",
    color: "white",
  },
});

rawStyles({});
//------------------------------------------------------------------
// Metrics()
//------------------------------------------------------------------
/*::
type Props = {
}
*/
export const Controls = (props /*: Props */) /*: string */ => {
  const [state, dispatch] = useContext(AppContext);
  const [playPauseToggle /*: number */, setPlayPause /*: function */] =
    useState(false);
  const [playState /*: number */, setPlayState /*: function */] =
    useState(true);
  useEffect(() => {
    setTimeout(() => {
      hideControlsIconOnLoad();
    }, 100);
  }, []);
  return html`
    <div id="controls-icon" className="${styles.controls}">
      <span
        className="material-icons ${styles.controlsIcon}"
        onClick="${controls(playState, setPlayState)}"
      >
        ${playState === true && html`pause_circle`}
        ${playState === false && html`play_circle`}
      </span>
    </div>
  `;
};
export default Controls;
//------------------------------------------------------------------
// FUNCTION: controls()
//------------------------------------------------------------------
export const controls =
  (playState /*: boolean */, setPlayState /*: function */) /*: () => void */ =>
  () /*: void */ => {
    const paused = gState().get("paused");
    if (paused === true) {
      gState().set("paused", false);
      setPlayState(true);
    } else {
      gState().set("paused", true);
      setPlayState(false);
    }
  };
//------------------------------------------------------------------
// FUNCTION: hideControlsIconOnLoad()
//------------------------------------------------------------------
export const hideControlsIconOnLoad = () /*: void */ => {
  const controlsIcon = document.getElementById("controls-icon");
  if (controlsIcon !== null) {
    controlsIcon.style.display = "none";
  }
};
