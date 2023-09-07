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
// FUNCTION: DevUnits
//------------------------------------------------------------------
/*::
type Props = {
	devUnits: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="devUnits">Dev Units:</label>
      <output id="devUnitsOutput" name="devUnitsOutput" for="devUnits"
        >${(props.devUnits || 0).toString()}</output
      >
      <input
        type="range"
        id="devUnits"
        name="devUnits"
        min="1"
        max="50"
        step="1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.devUnits || 0).toString()}"
      />
    </div>
  `;
};
