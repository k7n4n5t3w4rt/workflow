// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./actions/gSttngs.js";
import gState from "./actions/gState.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../../web_modules/preact/hooks.js";
import { html } from "../../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------

/*::
type Props = {
}
*/
export const Share = (props /*: Props */) /*: string */ => {
  const [settings, setSettings] = useState(gSttngs().keyValuePairs);
  return html`HERE: ${btoa(JSON.stringify(settings))} `;
  //${settings.map((setting /*: any  */) /*: void */ => {})}
};
export default Share;
