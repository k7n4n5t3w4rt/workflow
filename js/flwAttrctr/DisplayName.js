// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { useContext, useEffect, useState } from "preact/hooks";
import { html } from "htm/preact";
import { AppContext } from "../AppContext.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import gState from "./actions/gState.js";
import gSttngs from "./actions/gSttngs.js";
import seedString from "../simple_css_seed.js";
import { rawStyles, createStyles, setSeed } from "simplestyle-js";

setSeed(seedString("flwdisplayname"));

const [styles] = createStyles({
  displayName: {
    position: "absolute",
    zIndex: "50000",
    boxSizing: "border-box",
    top: "1.2rem",
    left: "1.2rem",
    cursor: "pointer",
    display: "block", // Initially visible
    color: "white",
    fontSize: "2rem",
    textShadow: "2px 2px 2px #444",
  },
});

rawStyles({});

/*::
type Props = {
}
*/
export const DisplayName = (props /*: Props */) /*: string */ => {
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    const sceneInitInterval = setInterval(() => {
      if (gState().get("sceneInitialized")) {
        const displayNameEl = document.getElementById("display-name");
        if (displayNameEl) {
          displayNameEl.style.display = "none";
        }
        clearInterval(sceneInitInterval);
      }
    }, 20);

    return () => {
      clearInterval(sceneInitInterval);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      showDisplayNameOnLoad();
    }, 20);
  }, []);
  return html`
    <div id="display-name" className="${styles.displayName}">
      ${state.displayName}
    </div>
  `;
};

//------------------------------------------------------------------
// FUNCTION: showDisplayNameIconOnLoad()
//------------------------------------------------------------------
export const showDisplayNameOnLoad = () /*: void */ => {
  const displayName = document.getElementById("display-name");
  if (displayName !== null) {
    displayName.style.display = "block";
  }
};

export default DisplayName;
