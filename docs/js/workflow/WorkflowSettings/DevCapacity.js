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
	devCapacity: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="devCapacity">Dev. Power:</label>
      <output id="devCapacityOutput" name="devCapacityOutput" for="devCapacity"
        >${props.devCapacity.toString()}</output
      >
      <input
        type="range"
        id="devCapacity"
        name="devCapacity"
        min="0"
        max="1"
        step="0.05"
        onChange=${props.changeSetting}
        value="${props.devCapacity.toString()}"
      />
    </div>
  `;
};
