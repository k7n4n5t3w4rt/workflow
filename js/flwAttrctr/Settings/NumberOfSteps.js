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
	numberOfSteps: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="numberOfSteps">No. of Steps:</label>
      <output
        id="numberOfStepsOutput"
        name="numberOfStepsOutput"
        for="numberOfSteps"
        >${(props.numberOfSteps || 0).toString()}</output
      >
      <input
        type="range"
        id="numberOfSteps"
        name="numberOfSteps"
        min="1"
        max="12"
        step="1"
        onChange=${props.changeSetting}
        value="${(props.numberOfSteps || 0).toString()}"
      />
    </div>
  `;
};
