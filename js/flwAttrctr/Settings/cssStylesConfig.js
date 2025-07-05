// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import seedString from "../../simple_css_seed.js";
import { createStyles, setSeed } from "../../../web_modules/simplestyle-js.js";

//------------------------------------------------------------------
// FUNCTION: cssStylesConfig()
//------------------------------------------------------------------
export default () /*: Object */ => {
  // A seed for getting unique class names
  setSeed(seedString("flwconfig"));

  const [styles] = createStyles({
    configContainer: {
      position: "absolute",
      zIndex: "41000",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "48px",
      paddingBottom: "96px",
      top: "0",
      overflowY: "auto",
      color: "white",
    },
    config: {
      position: "absolute",
      zIndex: "50000",
      boxSizing: "border-box",
      bottom: "8px",
      right: "8px",
      cursor: "pointer",
    },
    configIcon: {
      fontSize: "54px",
      color: "white",
    },
    configClose: {
      position: "absolute",
      zIndex: "43000",
      boxSizing: "border-box",
      top: "6px",
      right: "6px",
      cursor: "pointer",
    },
    field: {
      display: "grid",
      gridTemplateColumns: "1fr 200px",
      alignItems: "center",
      marginBottom: "16px",
      "@media (max-width: 768px)": {
        gridTemplateColumns: "1fr",
      },
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      justifySelf: "end",
      "@media (max-width: 768px)": {
        justifySelf: "start",
        marginTop: "8px",
      },
    },
    stepHeading: {
      fontSize: "16px",
      padding: "3px",
      marginTop: "16px",
      marginBottom: "16px",
      backgroundColor: "#fabd20",
    },
    radioContainer: {
      display: "flex",
      marginBottom: "16px",
    },
    legend: {
      fontSize: "19px",
      fontWeight: "bold",
      marginBottom: "16px",
      color: "#ff7f00",
    },
    editableCheckbox: {
      width: "20px",
      height: "20px",
    },
  });

  return styles;
};
