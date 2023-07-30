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
	devPowerFix: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="devPowerFix">Dev Power Fix:</label>
      <output id="devPowerFixOutput" name="devPowerFixOutput" for="devPowerFix"
        >${props.devPowerFix.toString()}</output
      >
      <input
        type="range"
        id="devPowerFix"
        name="devPowerFix"
        min="0"
        max="3"
        step="0.01"
        onChange=${props.changeSetting}
        value="${props.devPowerFix.toString()}"
      />
    </div>
  `;
};
