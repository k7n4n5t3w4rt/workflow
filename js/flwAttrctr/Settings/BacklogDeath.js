// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "../../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
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
      <label for="backlogDeath">Backlog Death:</label>
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
        value="${(props.backlogDeath || 0).toString()}"
      />
    </div>
  `;
};
