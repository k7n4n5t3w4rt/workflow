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
  index: number,
	name: string,
  changeStepName: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="step${props.index}Name">Name:</label>
      <input
        type="text"
        id="step${props.index}Name"
        name="step${props.index}Name"
        onInput=${props.changeStepName}
        value="${props.name}"
        onFocus=${setUpdtngCnfg(true)}
        onBlur=${setUpdtngCnfg(false)}
      />
    </div>
  `;
};
