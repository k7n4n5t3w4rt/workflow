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
	flwItmSizeMax: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="flwItmSizeMax">Flow Item Size Max.:</label>
      <output
        id="flwItmSizeMaxOutput"
        name="flwItmSizeMaxOutput"
        for="flwItmSizeMax"
        >${props.flwItmSizeMax.toString()}</output
      >
      <input
        type="range"
        id="flwItmSizeMax"
        name="flwItmSizeMax"
        min="1"
        max="50"
        step="1"
        onChange=${props.changeSetting}
        value="${props.flwItmSizeMax.toString()}"
      />
    </div>
  `;
};
