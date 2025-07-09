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
  linkedIn: {
    position: "absolute",
    zIndex: "50000",
    display: "block",
    boxSizing: "border-box",
    bottom: "0.5rem",
    left: "0.5rem",
    cursor: "pointer",
  },
  linkedInIcon: {
    fontSize: "54px",
    color: "white",
  },
});
rawStyles({});
//------------------------------------------------------------------
// LinkedIn()
//------------------------------------------------------------------
/*::
type Props = {
}
*/
export const LinkedIn = (props /*: Props */) /*: string */ => {
  useEffect(() => {
    setTimeout(() => {
      showLinkedInIconOnLoad();
    }, 20);
  }, []);

  return html`
    <div id="linkedin-icon" className="${styles.linkedIn}">
      <a href="https://www.linkedin.com/in/kynanhughes/" target="_blank"
        ><img src="/img/cv_profile_circle.png" height="45px" width="45px"
      /></a>
    </div>
  `;
};
export default LinkedIn;

//------------------------------------------------------------------
// FUNCTION: showLinkedInIconOnLoad()
//------------------------------------------------------------------
export const showLinkedInIconOnLoad = () /*: void */ => {
  const linkedinIcon = document.getElementById("linkedin-icon");
  if (linkedinIcon !== null) {
    linkedinIcon.style.display = "block";
  }
};
