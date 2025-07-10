// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import seedString from "../../simple_css_seed.js";
import { createStyles, setSeed } from "simplestyle-js";

//------------------------------------------------------------------
// FUNCTION: cssStylesSettings()
//------------------------------------------------------------------
export default () /*: Object */ => {
  // A seed for getting unique class names
  setSeed(seedString("flwparams"));

  const [styles] = createStyles({
    inputHeading: {
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px #444",
      backgroundColor: "#ff7f00",
      marginBottom: "1rem",
      padding: "0.4rem",
    },
    paramsContainer: {
      position: "absolute",
      zIndex: "31000",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      paddingTop: "3rem",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "3rem",
      paddingBottom: "6rem",
      top: "0",
    },
    params: {
      position: "absolute",
      zIndex: "50000",
      boxSizing: "border-box",
      bottom: ".5rem",
      right: ".5rem",
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
