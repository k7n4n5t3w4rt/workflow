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
	expdtQueueLength: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="expdtQueueLength"
        >Number of expedited items in the system:</label
      >
      <output
        id="expdtQueueLengthOutput"
        name="expdtQueueLengthOutput"
        for="expdtQueueLength"
        >${(props.expdtQueueLength || 0).toString()}</output
      >
      <input
        type="range"
        id="expdtQueueLength"
        name="expdtQueueLength"
        min="0"
        max="20"
        step="1"
        onChange=${props.changeSetting}
        value="${(props.expdtQueueLength || 0).toString()}"
      />
    </div>
  `;
};
