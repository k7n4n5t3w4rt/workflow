// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "../../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";

/*::
type Props = {
	sid: number,
  changeSid: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="sid">Session ID:</label>
      <input
        type="text"
        id="sid"
        name="sid"
        onInput=${props.changeSid}
        value="${(props.sid || 0).toString()}"
        onFocus=${setUpdtngCnfg(true)}
        onBlur=${setUpdtngCnfg(false)}
      />
    </div>
  `;
};
