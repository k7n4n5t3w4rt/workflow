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
// FUNCTION: Death
//------------------------------------------------------------------
/*::
type Props = {
	death: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="death">Lifespan for work items (0 = no limit):</label>
      <output id="deathOutput" name="deathOutput" for="death"
        >${(props.death || 0).toString()}</output
      >
      <input
        type="range"
        id="death"
        name="death"
        min="0"
        max="500"
        step="1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.death || 0).toString()}"
      />
    </div>
  `;
};
