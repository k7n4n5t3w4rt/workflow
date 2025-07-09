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
	dfntnOfReady: boolean,
  changeSetting: () => void,
  styles: Object
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <div className="${props.styles.inputHeading}">Definition of Ready:</div>
      <div className="${props.styles.radioContainer}">
        <label for="dfntnOfReadyTrue">
          ${props.dfntnOfReady === true &&
          html`<input
            type="radio"
            id="dfntnOfReadyTrue"
            name="dfntnOfReady"
            value="true"
            onChange=${props.changeSetting}
            checked
          />`}
          ${props.dfntnOfReady === false &&
          html`<input
            type="radio"
            id="dfntnOfReadyTrue"
            name="dfntnOfReady"
            value="true"
            onChange=${props.changeSetting}
          />`}
          <span>True</span>
        </label>
        <label for="dfntnOfReadyFalse">
          ${props.dfntnOfReady === false &&
          html`
            <input
              type="radio"
              id="dfntnOfReadyFalse"
              name="dfntnOfReady"
              value="false"
              onChange=${props.changeSetting}
              checked
            />
          `}
          ${props.dfntnOfReady === true &&
          html`
            <input
              type="radio"
              id="dfntnOfReadyFalse"
              name="dfntnOfReady"
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
