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
      <p>
        The WIP level (as a % of the limit) at which drag begins to take effect.
        The default is 0.5.
      </p>
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
