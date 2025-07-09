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
// FUNCTION: Drag
//------------------------------------------------------------------
/*::
type Props = {
	drag: number,
  changeSetting: () => void,
}
*/
export const Drag = (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>
        The percentage of dev capacity that is lost when there is too much WIP.
        The default is 0.
      </p>
      <label for="drag">Dev. capacity lost when there is too much WIP:</label>
      <output id="dragOutput" name="dragOutput" for="drag"
        >${(props.drag || 0).toString()}</output
      >
      <input
        type="range"
        id="drag"
        name="drag"
        min="0"
        max="1"
        step="0.1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.drag || 0).toString()}"
      />
    </div>
  `;
};
export default Drag;
