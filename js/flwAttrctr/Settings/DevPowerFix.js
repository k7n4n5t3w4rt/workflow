// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "htm/preact";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";
//------------------------------------------------------------------
// FUNCTION: DevPowerFix
//------------------------------------------------------------------
/*::
type Props = {
	devPowerFix: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  console.log("DevPowerFix component received value:", props.devPowerFix);
  const devUnitsTerm = gSttngs().get("devUnitsTerm");
  return html`
    <div>
      <p>
        The Dev Power Fix is a device for tuning our simulation so that it gets
        as close as we can to the desired overall Flow Time. The reason is that
        we're modelling a complex system and it's pretty much impossible to
        control the overall Flow Time just by setting the Flow Time values for
        each step - the three body problem and all that. A value of 1 for Dev
        Power Fix does nothing. The existing settings for how quickly
        ${devUnitsTerm} are getting through the work items is multiplied by 1.
        Values above 1 make ${devUnitsTerm} more effective getting through the
        work items at each step and therefore reduce overall Flow Time. Values
        below 1 have the opposite effect - i.e. they increase overall Flow Time
        by making ${devUnitsTerm} less effective.
      </p>
      <label for="devPowerFix">Dev Power Fix:</label>
      <output id="devPowerFixOutput" name="devPowerFixOutput" for="devPowerFix"
        >${(props.devPowerFix || 1).toString()}</output
      >
      <input
        type="range"
        id="devPowerFix"
        name="devPowerFix"
        min="0"
        max="7"
        step="0.01"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.devPowerFix || 1).toString()}"
      />
    </div>
  `;
};
