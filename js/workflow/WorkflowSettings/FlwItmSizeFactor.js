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
	flwItmSizeLimit: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="flwItmSizeLimit">Flow Item Size Factor:</label>
      <output
        id="flwItmSizeLimitOutput"
        name="flwItmSizeLimitOutput"
        for="flwItmSizeLimit"
        >${props.flwItmSizeLimit.toString()}</output
      >
      <input
        type="range"
        id="flwItmSizeLimit"
        name="flwItmSizeLimit"
        min="0"
        max="1"
        step="0.05"
        onChange=${props.changeSetting}
        value="${props.flwItmSizeLimit.toString()}"
      />
    </div>
  `;
};
