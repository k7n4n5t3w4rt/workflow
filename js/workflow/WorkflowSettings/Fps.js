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
	fps: number,
  changeSetting: () => void,
}
*/
export default (props /*: Props */) /*: string */ => {
  return html`
    <div>
      <label for="fps">FPS:</label>
      <output id="fpsOutput" name="fpsOutput" for="fps"
        >${props.fps.toString()}</output
      >
      <input
        type="range"
        id="fps"
        name="fps"
        min="0.25"
        max="10"
        step="0.25"
        onChange=${props.changeSetting}
        value="${props.fps.toString()}"
      />
    </div>
  `;
};
