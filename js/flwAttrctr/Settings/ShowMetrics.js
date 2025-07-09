// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "htm/preact";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------

/*::
type Props = {
	showMetrics: boolean,
  changeSetting: () => void,
  styles: Object
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <div className="${props.styles.inputHeading}">Show Metrics:</div>
      <div className="${props.styles.radioContainer}">
        <label for="showMetricsTrue">
          ${props.showMetrics === true &&
          html`<input
            type="radio"
            id="showMetricsTrue"
            name="showMetrics"
            value="true"
            onChange=${props.changeSetting}
            checked
          />`}
          ${props.showMetrics === false &&
          html`<input
            type="radio"
            id="showMetricsTrue"
            name="showMetrics"
            value="true"
            onChange=${props.changeSetting}
          />`}
          <span>True</span>
        </label>
        <label for="showMetricsFalse">
          ${props.showMetrics === false &&
          html`
            <input
              type="radio"
              id="showMetricsFalse"
              name="showMetrics"
              value="false"
              onChange=${props.changeSetting}
              checked
            />
          `}
          ${props.showMetrics === true &&
          html`
            <input
              type="radio"
              id="showMetricsFalse"
              name="showMetrics"
              value="false"
              onChange=${props.changeSetting}
            />
          `}
          <span>False</span>
        </label>
      </div>
    </div>
  `;
};
