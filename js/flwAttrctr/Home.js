// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { useEffect, useState } from "../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import gState from "./actions/gState.js";
import seedString from "../simple_css_seed.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../../web_modules/simplestyle-js.js";

setSeed(seedString("flwhome"));

const [styles] = createStyles({
  home: {
    position: "absolute",
    zIndex: "50000",
    boxSizing: "border-box",
    top: "1.2rem",
    left: "1.2rem",
    cursor: "pointer",
    display: "none", // Initially hidden
  },
  homeIcon: {
    fontSize: "54px",
    color: "white",
  },
});

rawStyles({});

/*::
type Props = {
}
*/
export const Home = (props /*: Props */) /*: string */ => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (gState().get("sceneInitialized")) {
        const homeIcon = document.getElementById("home-icon");
        if (homeIcon && gState().get("sceneInitialized") === true) {
          homeIcon.style.display = "block";
        } else if (homeIcon && gState().get("sceneInitialized") === false) {
          homeIcon.style.display = "none";
        }
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [gState().get("sceneInitialized")]);

  return html`
    <div
      id="home-icon"
      className="${styles.home}"
      onClick=${() => window.location.reload()}
    >
      <span className="material-icons ${styles.homeIcon}"> home </span>
    </div>
  `;
};

export default Home;
