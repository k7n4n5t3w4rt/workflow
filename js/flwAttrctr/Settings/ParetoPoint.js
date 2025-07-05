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
      <p>The Pareto principle (80/20 rule) applied to value. The default of 0.2 means 80% of the value comes from 20% of the work items.</p>
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