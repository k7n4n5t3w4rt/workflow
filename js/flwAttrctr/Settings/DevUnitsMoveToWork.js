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
