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
// FUNCTION: BacklogDeath
//------------------------------------------------------------------
/*::
type Props = {
	backlogDeath: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>The maximum number of days an item can remain in the backlog before being removed (0 = no limit). The default is 0.</p>
      <label for="backlogDeath"
        >Max. age for items in the backlog (0 = no limit):</label
      >
      <output
        id="backlogDeathOutput"
        name="backlogDeathOutput"
        for="backlogDeath"
        >${(props.backlogDeath || 0).toString()}</output
      >
      <input
        type="range"
        id="backlogDeath"
        name="backlogDeath"
        min="0"
        max="500"
        step="1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.backlogDeath || 0).toString()}"
      />
    </div>
  `;
};