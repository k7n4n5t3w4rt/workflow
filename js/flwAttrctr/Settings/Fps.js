// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "../../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";
import {
  useContext,
  useEffect,
  useState,
  useReducer,
} from "../../../web_modules/preact/hooks.js";
//------------------------------------------------------------------
// FUNCTION: Fps
//------------------------------------------------------------------
/*::
type Props = {
	fps: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  useEffect(() => {
    console.log("Fps.js mounted");
    console.log(props);
  }, []);
  return html`
    <div>
      <p>The frame rate of the simulation.</p>
      <label for="fps">FPS:</label>
      <output id="fpsOutput" name="fpsOutput" for="fps"
        >${(props.fps || 0).toString()}</output
      >
      <input
        type="range"
        id="fps"
        name="fps"
        min="0.25"
        max="10"
        step="0.25"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.fps || 0).toString()}"
      />
    </div>
  `;
};