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
// FUNCTION: DevPowerFix
//------------------------------------------------------------------
/*::
type Props = {
	devPowerFix: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>A fixed value for the development power, which overrides the calculated value.</p>
      <label for="devPowerFix">Dev Power Fix:</label>
      <output id="devPowerFixOutput" name="devPowerFixOutput" for="devPowerFix"
        >${(props.devPowerFix || 1).toString()}</output
      >
      <input
        type="range"
        id="devPowerFix"
        name="devPowerFix"
        min="0"
        max="7"
        step="0.01"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.devPowerFix || 1).toString()}"
      />
    </div>
  `;
};