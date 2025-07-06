// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "../../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";
//------------------------------------------------------------------
// FUNCTION: TimeBox
//------------------------------------------------------------------
/*::
type Props = {
	timeBox: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>The number of days in a timebox (e.g., 10 for a 2-week sprint). The default is 10.</p>
      <label for="timeBox">TimeBox:</label>
      <output id="timeBoxOutput" name="timeBoxOutput" for="timeBox"
        >${(props.timeBox || 0).toString()}</output
      >
      <input
        type="range"
        id="timeBox"
        name="timeBox"
        min="1"
        max="60"
        step="1"
        onChange=${props.changeSetting}
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.timeBox || 0).toString()}"
      />
    </div>
  `;
};