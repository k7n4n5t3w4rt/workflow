// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "htm/preact";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";

/*::
type Props = {
  targetFlowTime: number,
  changeSetting: () => void,
  handleTuneClick: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>
        The target flow time for the simulation. The model will attempt to adjust the Dev Power Fix to achieve this value.
      </p>
      <label for="targetFlowTime">Target Flow Time:</label>
      <input
        type="text"
        id="targetFlowTime"
        name="targetFlowTime"
        onInput=${props.changeSetting}
        onFocus=${setUpdtngCnfg(true)}
        onBlur=${setUpdtngCnfg(false)}
        value="${(props.targetFlowTime || 10).toString()}"
      />
      <button onClick=${props.handleTuneClick}>Tune</button>
    </div>
  `;
};
