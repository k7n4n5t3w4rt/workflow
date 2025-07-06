// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "../../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";
//------------------------------------------------------------------
// FUNCTION: NumberOfSteps
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
      <p>The number of steps in your workflow. The default is 6.</p>
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
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.numberOfSteps || 0).toString()}"
      />
    </div>
  `;
};