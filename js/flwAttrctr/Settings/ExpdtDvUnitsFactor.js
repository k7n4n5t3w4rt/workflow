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
// FUNCTION: ExpdtDvUnitsFactor
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
      <p>
        The percentage of dev units that will focus on expedited items. The
        default is 1 (100%).
      </p>
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
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.expdtDvUnitsFactor || 0).toString()}"
      />
    </div>
  `;
};
