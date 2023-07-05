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
	wipLimitEachStep: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="wipLimitEachStep">WIP Limit (same for each step):</label>
      <output
        id="wipLimitEachStepOutput"
        name="wipLimitEachStepOutput"
        for="wipLimitEachStep"
        >${props.wipLimitEachStep.toString()}</output
      >
      <input
        type="range"
        id="wipLimitEachStep"
        name="wipLimitEachStep"
        min="0"
        max="20"
        step="1"
        onChange=${props.changeSetting}
        value="${props.wipLimitEachStep.toString()}"
      />
    </div>
  `;
};
