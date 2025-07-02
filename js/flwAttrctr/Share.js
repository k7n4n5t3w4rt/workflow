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
} from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
import Steps from "./Metrics/Steps.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import share from "./actions/share.js";
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";

setSeed(seedString("flwshare"));

const [styles] = createStyles({
  share: {
    position: "absolute",
    zIndex: "50000",
    boxSizing: "border-box",
    top: "1.2rem",
    right: "1.2rem",
    cursor: "pointer",
  },
  shareIcon: {
    fontSize: "54px",
    color: "white",
  },
});

rawStyles({});
//------------------------------------------------------------------
// Metrics()
//------------------------------------------------------------------
/*::
type Props = {
}
*/
export const Share = (props /*: Props */) /*: string */ => {
  return html`
    <div id="share-icon" className="${styles.share}">
      <span className="material-icons ${styles.shareIcon}" onClick="${share}">
        share
      </span>
    </div>
  `;
};
export default Share;
