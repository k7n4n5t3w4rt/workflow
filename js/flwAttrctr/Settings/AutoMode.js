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
	autoMode: boolean,
  changeSetting: () => void,
  styles: Object
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label>AutoMode:</label>
      <div className="${props.styles.radioContainer}">
        <label for="autoModeTrue">
          ${props.autoMode === true &&
          html`<input
            type="radio"
            id="autoModeTrue"
            name="autoMode"
            value="true"
            onChange=${props.changeSetting}
            checked
          />`}
          ${props.autoMode === false &&
          html`<input
            type="radio"
            id="autoModeTrue"
            name="autoMode"
            value="true"
            onChange=${props.changeSetting}
          />`}
          <span>True</span>
        </label>
        <label for="autoModeFalse">
          ${props.autoMode === false &&
          html`
            <input
              type="radio"
              id="autoModeFalse"
              name="autoMode"
              value="false"
              onChange=${props.changeSetting}
              checked
            />
          `}
          ${props.autoMode === true &&
          html`
            <input
              type="radio"
              id="autoModeFalse"
              name="autoMode"
              value="false"
              onChange=${props.changeSetting}
            />
          `}
          <span>false</span>
        </label>
      </div>
    </div>
  `;
};
