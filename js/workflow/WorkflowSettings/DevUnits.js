// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "../../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
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
        value="${(props.devUnits || 0).toString()}"
      />
    </div>
  `;
};
