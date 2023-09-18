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
// FUNCTION: DragPoint
//------------------------------------------------------------------
/*::
type Props = {
	dragPoint: number,
  changeSetting: () => void,
}
*/
export const DragPoint = (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="dragPoint">The point at which drag kicks in:</label>
      <output id="dragPointOutput" name="dragPointOutput" for="dragPoint"
        >${(props.dragPoint || 0).toString()}</output
      >
      <input
        type="range"
        id="dragPoint"
        name="dragPoint"
        min="0"
        max="0.75"
        step="0.01"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.dragPoint || 0).toString()}"
      />
    </div>
  `;
};
export default DragPoint;
