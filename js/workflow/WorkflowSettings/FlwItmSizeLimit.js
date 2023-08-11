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
      <label for="flwItmSizeLimit">Flow Item Size Limit:</label>
      <output
        id="flwItmSizeLimitOutput"
        name="flwItmSizeLimitOutput"
        for="flwItmSizeLimit"
        >${(props.flwItmSizeLimit || 0).toString()}</output
      >
      <input
        type="range"
        id="flwItmSizeLimit"
        name="flwItmSizeLimit"
        min="0.2"
        max="1"
        step="0.1"
        onChange=${props.changeSetting}
        value="${(props.flwItmSizeLimit || 0).toString()}"
      />
    </div>
  `;
};
