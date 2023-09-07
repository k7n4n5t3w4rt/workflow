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
// FUNCTION: Status
//------------------------------------------------------------------
/*::
type Props = {
  index: number,
	status: string,
  changeStepStatus: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="status${props.index}">Status:</label>
      <select
        class="browser-default"
        id="status${props.index}"
        name="status${props.index}"
        onChange=${props.changeStepStatus}
        onFocus=${setUpdtngCnfg(true)}
        onBlur=${setUpdtngCnfg(false)}
      >
        ${props.status === "backlog" &&
        html`<option value="backlog" selected>Backlog</option>`}
        ${props.status !== "backlog" &&
        html`<option value="backlog">Backlog</option>`}
        ${props.status === "wait" &&
        html`<option value="wait" selected>Wait</option>`}
        ${props.status !== "wait" && html`<option value="wait">Wait</option>`}
        ${props.status === "touch" &&
        html`<option value="touch" selected>Touch</option>`}
        ${props.status !== "touch" &&
        html`<option value="touch">Touch</option>`}
        ${props.status === "done" &&
        html`<option value="done" selected>Done</option>`}
        ${props.status !== "done" && html`<option value="done">Done</option>`}
      </select>
      <br />
    </div>
  `;
};
