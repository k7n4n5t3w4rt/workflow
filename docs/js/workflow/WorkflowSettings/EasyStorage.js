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
	easyStorage: boolean,
  changeSetting: () => void,
  styles: Object
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <div className="${props.styles.inputHeading}">Easy Storage:</div>
      <div className="${props.styles.radioContainer}">
        <label for="easyStorageTrue">
          ${props.easyStorage === true &&
          html`<input
            type="radio"
            id="easyStorageTrue"
            name="easyStorage"
            value="true"
            onChange=${props.changeSetting}
            checked
          />`}
          ${props.easyStorage === false &&
          html`<input
            type="radio"
            id="easyStorageTrue"
            name="easyStorage"
            value="true"
            onChange=${props.changeSetting}
          />`}
          <span>True</span>
        </label>
        <label for="easyStorageFalse">
          ${props.easyStorage === false &&
          html`
            <input
              type="radio"
              id="easyStorageFalse"
              name="easyStorage"
              value="false"
              onChange=${props.changeSetting}
              checked
            />
          `}
          ${props.easyStorage === true &&
          html`
            <input
              type="radio"
              id="easyStorageFalse"
              name="easyStorage"
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
