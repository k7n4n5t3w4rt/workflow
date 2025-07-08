// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { useContext } from "../../../web_modules/preact/hooks.js";
import { html } from "../../../web_modules/htm/preact.js";
import { AppContext } from "../../AppContext.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";

/*::
type Props = {
  devUnitsMoveToWork: boolean,
  changeSetting: (e: Event) => void,
};
*/

export const DevUnitsMoveToWork = (props /*: Props */) /*: string */ => {
  const { devUnitsMoveToWork, changeSetting } = props;
  const [state, dispatch] = useContext(AppContext);
  const devUnitsTerm = gSttngs().get("devUnitsTerm");

  return html`
    <div>
      <p>
        If ${devUnitsTerm} Move to Work is checked, ${devUnitsTerm} will be free
        to move to any step where the work is, rather than being fixed to a
        specific step. This models a situation in which there are no 'silos'
        between or within teams. In the future, we plan to make this a sliding
        scale rather than a binary.
      </p>
      <input
        type="checkbox"
        id="devUnitsMoveToWork"
        name="devUnitsMoveToWork"
        checked=${devUnitsMoveToWork}
        onChange=${changeSetting}
      />
      <label for="devUnitsMoveToWork">
        Allow ${devUnitsTerm} to move to the work
      </label>
    </div>
  `;
};

export default DevUnitsMoveToWork;
