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
	strtAvrgFlwTime: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="strtAvrgFlwTime">Start Av. Flow Time.:</label>
      <output
        id="strtAvrgFlwTimeOutput"
        name="strtAvrgFlwTimeOutput"
        for="strtAvrgFlwTime"
        >${props.strtAvrgFlwTime.toString()}</output
      >
      <input
        type="range"
        id="strtAvrgFlwTime"
        name="strtAvrgFlwTime"
        min="10"
        max="200"
        step="10"
        onChange=${props.changeSetting}
        value="${props.strtAvrgFlwTime.toString()}"
      />
    </div>
  `;
};
