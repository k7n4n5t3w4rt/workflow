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
	flwItmSizeFactor: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="flwItmSizeFactor">Flow Item Size Factor:</label>
      <output
        id="flwItmSizeFactorOutput"
        name="flwItmSizeFactorOutput"
        for="flwItmSizeFactor"
        >${props.flwItmSizeFactor.toString()}</output
      >
      <input
        type="range"
        id="flwItmSizeFactor"
        name="flwItmSizeFactor"
        min="0"
        max="1"
        step="0.05"
        onChange=${props.changeSetting}
        value="${props.flwItmSizeFactor.toString()}"
      />
    </div>
  `;
};
