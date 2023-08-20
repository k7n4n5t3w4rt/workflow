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
      <label for="expdtDvUnitsFactor"
        >% of dev units focused on expedited items:</label
      >
      <output
        id="expdtDvUnitsFactorOutput"
        name="expdtDvUnitsFactorOutput"
        for="expdtDvUnitsFactor"
        >${((props.expdtDvUnitsFactor || 0) * 100).toString() + "%"}</output
      >
      <input
        type="range"
        id="expdtDvUnitsFactor"
        name="expdtDvUnitsFactor"
        min="0"
        max="1"
        step="0.25"
        onChange=${props.changeSetting}
        value="${(props.expdtDvUnitsFactor || 0).toString()}"
      />
    </div>
  `;
};
