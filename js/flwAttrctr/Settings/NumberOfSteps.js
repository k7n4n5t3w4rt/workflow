// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "htm/preact";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg";
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
      <p>
        The number of steps in the workflow, including the "backlog" and the
        "done" steps. For example, a simple "To Do", "Doing", "Done" workflow is
        3 steps. "To Do", "In Progress", "Ready for Review", "Reviewing", "Done"
        is 5 steps.
      </p>
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
