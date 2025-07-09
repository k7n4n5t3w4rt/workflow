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
// FUNCTION: FlwItmSizeLimit
//------------------------------------------------------------------
/*::
type Props = {
	flwItmSizeLimit: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <p>
        The Flow Item Size Limit constraint is closely related to the Pareto
        Point setting above - the point at which 80% of the value is delivered.
        By default the Pareto Point is set to 20%, meaning [a] that 20% of the
        work items in a workflow will deliver 80% of the value - or we might
        think of it in terms of each work item and say that [b] 20% of the work
        for each item will deliver 80% of the value for that item.
      </p>
      <p>
        Anyway, in a nutshell, making work items smaller increases their
        relative value. If the Pareto Point is set to 20%, then setting the Flow
        Item Size Limit to 20% will mean that each work item, although small, is
        delivering 80% of the value of the original larger work item. This is
        because it is the cream of the cream - the most important part of the
        feature. The rest of the work item - the 80% that delivers only 20% of
        the value - has to slog it out in the backlog for priority, where it
        will need to compete with the high-value 20% from the next lot of
        features, and so it might never get done. That's fine - "Maximise the
        work not done".
      </p>
      <label for="flwItmSizeLimit">Work Item Size Limit:</label>
      <output
        id="flwItmSizeLimitOutput"
        name="flwItmSizeLimitOutput"
        for="flwItmSizeLimit"
        >${((props.flwItmSizeLimit || 0) * 100).toString() + "%"}</output
      >
      <input
        type="range"
        id="flwItmSizeLimit"
        name="flwItmSizeLimit"
        min="0.2"
        max="1"
        step="0.1"
        onChange=${props.changeSetting}
        onTouchStart=${setUpdtngCnfg(true)}
        onTouchEnd=${setUpdtngCnfg(false)}
        onMouseDown=${setUpdtngCnfg(true)}
        onMouseUp=${setUpdtngCnfg(false)}
        value="${(props.flwItmSizeLimit || 0).toString()}"
      />
    </div>
  `;
};
