// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { useContext } from "preact/hooks";
import { html } from "htm/preact";
import { AppContext } from "../../AppContext";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg";
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
      <p>
        The ID is a unique identifier for the simulation configuration. There's
        no database of configs - FlowAttractor is completely stateless. A new ID
        is a completely new simulation. So, before you change the ID (or any
        other config setting you might want to get back) make sure to click on
        the share button and save the link for the current version of the
        simulation.
      </p>
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
