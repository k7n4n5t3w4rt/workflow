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
    inputHeading: {
      fontSize: "1rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
      padding: "0.2rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      marginTop: "1rem",
      marginBottom: "1rem",
      borderTop: "10px solid white",
      borderBottom: "10px solid white",
    },
    paramsContainer: {
      position: "absolute",
      zIndex: "31000",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      paddingTop: "3rem",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      padding: "3rem",
      paddingBottom: "6rem",
    },
    params: {
      position: "absolute",
      zIndex: "32000",
      boxSizing: "border-box",
      bottom: "0rem",
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
