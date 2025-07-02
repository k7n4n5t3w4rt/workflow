// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { useContext } from "../../../web_modules/preact/hooks.js";
import { html } from "../../../web_modules/htm/preact.js";
import { AppContext } from "../../AppContext.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";
//------------------------------------------------------------------
// FUNCTION: Sid()
//------------------------------------------------------------------
/*::
type Props = {
  sid: string,
  styles: Object,
  changeSetting: (e: Event) => void,
}
*/
export const Sid = (props /*: Props */) /*: string */ => {
  const { sid, changeSetting } = props;
  return html`
    <div>
      <label for="sid">ID:</label>
      <input
        type="text"
        id="sid"
        name="sid"
        onInput=${changeSetting}
        value="${sid}"
        onFocus=${() => setUpdtngCnfg(true)}
        onBlur=${() => setUpdtngCnfg(false)}
      />
    </div>
  `;
};
export default Sid;
