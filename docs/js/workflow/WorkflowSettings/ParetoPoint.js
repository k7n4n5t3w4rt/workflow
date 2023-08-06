// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "../../../web_modules/htm/preact.js";
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
      <label for="paretoPoint">ParetoPoint:</label>
      <output id="paretoPointOutput" name="paretoPointOutput" for="paretoPoint"
        >${props.paretoPoint.toString()}</output
      >
      <input
        type="range"
        id="paretoPoint"
        name="paretoPoint"
        min="0.2"
        max="1"
        step="0.1"
        onChange=${props.changeSetting}
        value="${props.paretoPoint.toString()}"
      />
    </div>
  `;
};
export default ParetoPoint;
