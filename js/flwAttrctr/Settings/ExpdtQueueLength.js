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
// FUNCTION: ExpdtQueueLength
//------------------------------------------------------------------
/*::
type Props = {
	expdtQueueLength: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>
        The number of expedited (unplanned) work items that can be in the system
        at any one time. The default is 0.
      </p>
      <label for="expdtQueueLength"
        >Number of expedited items in the system:</label
      >
      <output
        id="expdtQueueLengthOutput"
        name="expdtQueueLengthOutput"
        for="expdtQueueLength"
        >${(props.expdtQueueLength || 0).toString()}</output
      >
      <input
        type="range"
        id="expdtQueueLength"
        name="expdtQueueLength"
        min="0"
        max="20"
        step="1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.expdtQueueLength || 0).toString()}"
      />
    </div>
  `;
};
