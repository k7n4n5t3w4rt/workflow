// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "htm/preact";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";
//------------------------------------------------------------------
// ParetoPoint
//------------------------------------------------------------------
/*::
type Props = {
	paretoPoint: number,
  changeSetting: () => void,
}
*/
export const ParetoPoint = (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>
        The Pareto Point is 20% by default, meaning that 20% of the work items
        in a workflow will deliver 80% of the value. Setting it to, say, 80%
        means that 80% of the work items in a workflow will deliver 80% of the
        value. This would be basically saying that we always get the expected
        value from every work item, we're never wrong, we never have to guess,
        or iterate. We nail everything first time and users are always happy
        with the results, and use the features we build in the way we expect
        them to use them. Which is pretty unrealistic but it is a basic
        assumption that many people seem to make.
      </p>
      <label for="paretoPoint">80% of value comes from:</label>
      <output id="paretoPointOutput" name="paretoPointOutput" for="paretoPoint"
        >${((props.paretoPoint || 0) * 100).toString() + "%"}</output
      >
      <input
        type="range"
        id="paretoPoint"
        name="paretoPoint"
        min="0.2"
        max="0.8"
        step="0.1"
        onChange=${props.changeSetting}
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.paretoPoint || 0).toString()}"
      />
    </div>
  `;
};
export default ParetoPoint;
