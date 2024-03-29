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
// FUNCTION: FlwTimeMax
//------------------------------------------------------------------
/*::
type Props = {
	flwTimeMax: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="flwTimeMax">Flow Time Max.:</label>
      <output id="flwTimeMaxOutput" name="flwTimeMaxOutput" for="flwTimeMax"
        >${(props.flwTimeMax || 0).toString()}</output
      >
      <input
        type="range"
        id="flwTimeMax"
        name="flwTimeMax"
        min="1"
        max="400"
        step="1"
        onChange=${props.changeSetting}
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.flwTimeMax || 0).toString()}"
      />
    </div>
  `;
};
