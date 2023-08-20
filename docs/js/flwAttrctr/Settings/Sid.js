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
// FUNCTION: Sid()
//------------------------------------------------------------------
/*::
type Props = {
	sid: number,
  styles: Object,
  changeSid: () => void,
}
*/
export const Sid = (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="sid">ID:</label>
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
export default Sid;
