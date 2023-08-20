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
	death: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="death">Death:</label>
      <output id="deathOutput" name="deathOutput" for="death"
        >${(props.death || 0).toString()}</output
      >
      <input
        type="range"
        id="death"
        name="death"
        min="0"
        max="500"
        step="1"
        onChange=${props.changeSetting}
        value="${(props.death || 0).toString()}"
      />
    </div>
  `;
};
