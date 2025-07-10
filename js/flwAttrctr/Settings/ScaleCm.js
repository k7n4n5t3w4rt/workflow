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
// FUNCTION: ScaleCm
//------------------------------------------------------------------
/*::
type Props = {
	scaleCm: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>The scale of the work items and the environment. The default is 2.</p>
      <label for="scaleCm">Scale (cm):</label>
      <output id="scaleCmOutput" name="scaleCmOutput" for="scaleCm"
        >${(props.scaleCm || 0).toString()}</output
      >
      <input
        type="range"
        id="scaleCm"
        name="scaleCm"
        min="1"
        max="100"
        step="0.5"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.scaleCm || 0).toString()}"
      />
    </div>
  `;
};
