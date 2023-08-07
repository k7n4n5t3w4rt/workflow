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
  useEffect(() => {
    window.location.href = `/?sid=${gSttngs().sid}&share=${btoa(
      JSON.stringify(settings),
    )}`; // Redirects to the specified URL
  }, []); // Empty dependency array ensures this runs once after initial render

  return html`HERE: ${btoa(JSON.stringify(settings))} `;
  //${settings.map((setting /*: any  */) /*: void */ => {})}
};
export default Share;
