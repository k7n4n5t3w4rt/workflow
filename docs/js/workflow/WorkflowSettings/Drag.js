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
	drag: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="drag">Drag:</label>
      <output id="dragOutput" name="dragOutput" for="drag"
        >${props.drag.toString()}</output
      >
      <input
        type="range"
        id="drag"
        name="drag"
        min="0"
        max="10"
        step="0.1"
        onChange=${props.changeSetting}
        value="${props.drag.toString()}"
      />
    </div>
  `;
};