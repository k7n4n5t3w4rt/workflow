// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "../../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------

/*::
type Props = {
	expdtDvUnitsFactor: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="expdtDvUnitsFactor">Expedited Dev Units Factor:</label>
      <output
        id="expdtDvUnitsFactorOutput"
        name="expdtDvUnitsFactorOutput"
        for="expdtDvUnitsFactor"
        >${props.expdtDvUnitsFactor.toString()}</output
      >
      <input
        type="range"
        id="expdtDvUnitsFactor"
        name="expdtDvUnitsFactor"
        min="0"
        max="1"
        step="0.25"
        onChange=${props.changeSetting}
        value="${props.expdtDvUnitsFactor.toString()}"
      />
    </div>
  `;
};
