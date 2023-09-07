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
  setSeed(seedString("flwsettings"));

  const [styles] = createStyles({
    inputHeading: {
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
      backgroundColor: "#ef3735",
      marginBottom: "1rem",
      padding: "0.4rem",
    },
    stepHeading: {
      fontSize: "1rem",
      padding: "0.2rem",
      marginTop: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#f79c43",
      padding: "0.4rem",
    },
    settingsContainer: {
      position: "absolute",
      zIndex: "21000",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "3rem",
      paddingBottom: "6rem",
      top: "0",
    },
    settings: {
      position: "absolute",
      zIndex: "22000",
      boxSizing: "border-box",
      bottom: "0.5rem",
      right: "5rem",
      cursor: "pointer",
    },
    settingsIcon: {
      fontSize: "54px",
      color: "white",
    },
    settingsClose: {
      position: "absolute",
      zIndex: "23000",
      boxSizing: "border-box",
      top: ".4rem",
      right: ".4rem",
      cursor: "pointer",
    },
    settingsCloseIcon: {
      fontSize: "54px",
      color: "white",
    },
    radioContainer: {
      display: "flex",
      marginBottom: "1rem",
    },
  });

  return styles;
};
