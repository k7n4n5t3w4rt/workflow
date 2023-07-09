// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import seedString from "../../simple_css_seed.js";
import { createStyles, setSeed } from "../../../web_modules/simplestyle-js.js";

//------------------------------------------------------------------
// FUNCTION: cssStylesSettings()
//------------------------------------------------------------------
export default () /*: Object */ => {
  // A seed for getting unique class names
  setSeed(seedString("flwparams"));

  const [styles] = createStyles({
    paramsContainer: {
      position: "absolute",
      zIndex: "31000",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      padding: "1rem",
      paddingTop: "3rem",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    params: {
      position: "absolute",
      zIndex: "32000",
      boxSizing: "border-box",
      bottom: ".4rem",
      right: ".4rem",
      cursor: "pointer",
    },
    paramsIcon: {
      fontSize: "54px",
      color: "white",
    },
    paramsClose: {
      position: "absolute",
      zIndex: "33000",
      boxSizing: "border-box",
      top: ".4rem",
      right: ".4rem",
      cursor: "pointer",
    },
    paramsCloseIcon: {
      fontSize: "54px",
      color: "white",
    },
  });
  return styles;
};
