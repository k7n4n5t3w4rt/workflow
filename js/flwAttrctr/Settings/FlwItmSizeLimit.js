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
// FUNCTION: FlwItmSizeLimit
//------------------------------------------------------------------
/*::
type Props = {
	flwItmSizeLimit: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>The maximum size of a work item, as a percentage of the default size. This can be used to model the effect of large work items on the system.</p>
      <label for="flwItmSizeLimit">Size Limit:</label>
      <output
        id="flwItmSizeLimitOutput"
        name="flwItmSizeLimitOutput"
        for="flwItmSizeLimit"
        >${((props.flwItmSizeLimit || 0) * 100).toString() + "%"}</output
      >
      <input
        type="range"
        id="flwItmSizeLimit"
        name="flwItmSizeLimit"
        min="0.2"
        max="1"
        step="0.1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.flwItmSizeLimit || 0).toString()}"
      />
    </div>
  `;
};