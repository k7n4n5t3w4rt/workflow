// @flow
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useContext,
  useEffect,
  useState,
  useReducer,
} from "../../../web_modules/preact/hooks.js";
import { html } from "../../web_modules/htm/preact.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
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
    setTimeout(() => {
      hideHomeIconOnLoad();
    }, 20);
  }, []);
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

//------------------------------------------------------------------
// FUNCTION: hideHomeIconOnLoad()
//------------------------------------------------------------------
export const hideHomeIconOnLoad = () /*: void */ => {
  const homeIcon = document.getElementById("home-icon");
  if (homeIcon !== null) {
    homeIcon.style.display = "none";
  }
};

export default Home;
