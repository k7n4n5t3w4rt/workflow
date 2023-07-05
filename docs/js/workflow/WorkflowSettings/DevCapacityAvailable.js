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
	devCapacityAvailable: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="devCapacityAvailable">Dev. Power:</label>
      <output
        id="devCapacityAvailableOutput"
        name="devCapacityAvailableOutput"
        for="devCapacityAvailable"
        >${props.devCapacityAvailable.toString()}</output
      >
      <input
        type="range"
        id="devCapacityAvailable"
        name="devCapacityAvailable"
        min="0"
        max="1"
        step="0.05"
        onChange=${props.changeSetting}
        value="${props.devCapacityAvailable.toString()}"
      />
    </div>
  `;
};
