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
        >${(props.timeBox || 0).toString()}</output
      >
      <input
        type="range"
        id="timeBox"
        name="timeBox"
        min="5"
        max="60"
        step="5"
        onChange=${props.changeSetting}
        value="${(props.timeBox || 0).toString()}"
      />
    </div>
  `;
};
