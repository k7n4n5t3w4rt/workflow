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
	avrgFlwTimeAtStart: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="avrgFlwTimeAtStart">Start Av. Flow Time.:</label>
      <output
        id="avrgFlwTimeAtStartOutput"
        name="avrgFlwTimeAtStartOutput"
        for="avrgFlwTimeAtStart"
        >${props.avrgFlwTimeAtStart.toString()}</output
      >
      <input
        type="range"
        id="avrgFlwTimeAtStart"
        name="avrgFlwTimeAtStart"
        min="1"
        max="200"
        step="1"
        onChange=${props.changeSetting}
        value="${props.avrgFlwTimeAtStart.toString()}"
      />
    </div>
  `;
};
