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
	timeBox: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="timeBox">TimeBox:</label>
      <output id="timeBoxOutput" name="timeBoxOutput" for="timeBox"
        >${props.timeBox.toString()}</output
      >
      <input
        type="range"
        id="timeBox"
        name="timeBox"
        min="1"
        max="20"
        step="1"
        onChange=${props.changeSetting}
        value="${props.timeBox.toString()}"
      />
    </div>
  `;
};
