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
	scaleCm: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="scaleCm">Scale (cm):</label>
      <output id="scaleCmOutput" name="scaleCmOutput" for="scaleCm"
        >${(props.scaleCm || 0).toString()}</output
      >
      <input
        type="range"
        id="scaleCm"
        name="scaleCm"
        min="1"
        max="100"
        step="1"
        onChange=${props.changeSetting}
        value="${(props.scaleCm || 0).toString()}"
      />
    </div>
  `;
};
