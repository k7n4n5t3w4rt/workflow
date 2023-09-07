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
