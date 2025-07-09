// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "htm/preact";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg";
//------------------------------------------------------------------
// FUNCTION: TimeBox
//------------------------------------------------------------------
/*::
type Props = {
	timeBox: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>
        The number of days in a timebox - e.g. a sprint, or a quarter. The unit
        of measurement is work days, but it is displayed as weeks, where a week
        is 5 work days. So, for a 2-week sprint, put 10 (10 days = 2 x 5 day
        week). For a 12-week quarter, put 60 (60 days = 12 x 5 day weeks).
      </p>
      <label for="timeBox">TimeBox:</label>
      <output id="timeBoxOutput" name="timeBoxOutput" for="timeBox"
        >${(props.timeBox || 0).toString()}</output
      >
      <input
        type="range"
        id="timeBox"
        name="timeBox"
        min="1"
        max="60"
        step="1"
        onChange=${props.changeSetting}
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.timeBox || 0).toString()}"
      />
    </div>
  `;
};
