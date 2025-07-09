// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./actions/gSttngs";
import gState from "./actions/gState";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "preact/hooks";
import { html } from "htm/preact";
import Steps from "./Metrics/Steps";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import share from "./actions/share";
import seedString from "../simple_css_seed";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "simplestyle-js";

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
