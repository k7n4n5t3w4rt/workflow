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
	debug: boolean,
  changeSetting: () => void,
  styles: Object
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <div className="${props.styles.inputHeading}">Debug:</div>
      <div className="${props.styles.radioContainer}">
        <label for="debugTrue">
          ${props.debug === true &&
          html`<input
            type="radio"
            id="debugTrue"
            name="debug"
            value="true"
            onChange=${props.changeSetting}
            checked
          />`}
          ${props.debug === false &&
          html`<input
            type="radio"
            id="debugTrue"
            name="debug"
            value="true"
            onChange=${props.changeSetting}
          />`}
          <span>True</span>
        </label>
        <label for="debugFalse">
          ${props.debug === false &&
          html`
            <input
              type="radio"
              id="debugFalse"
              name="debug"
              value="false"
              onChange=${props.changeSetting}
              checked
            />
          `}
          ${props.debug === true &&
          html`
            <input
              type="radio"
              id="debugFalse"
              name="debug"
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
