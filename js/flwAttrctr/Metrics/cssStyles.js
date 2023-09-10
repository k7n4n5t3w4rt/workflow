// @flow
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import seedString from "../../simple_css_seed.js";
import { createStyles, setSeed } from "../../../web_modules/simplestyle-js.js";
//------------------------------------------------------------------
// cssStyles()
//------------------------------------------------------------------
export const cssStyles = () /*: Object */ => {
  // A seed for getting unique class names
  setSeed(seedString("flwmetrics"));

  const [styles] = createStyles({
    metricsContainer: {
      position: "absolute",
      zIndex: "10500",
      boxSizing: "border-box",
      width: "100%",
      padding: "0.5rem",
      backgroundColor: "rgba(0, 0, 0, 0)",
      color: "white",
      textShadow: "2px 2px 2px grey",
      marginTop: "2.2rem",
      top: "0",
    },
    metricsDivs: {
      display: "flex",
      flexWrap: "nowrap",
      justifyContent: "space-evenly",
    },
    metricsSpans: {
      display: "block",
      boxSizing: "border-box",
      color: "white",
      textShadow: "2px 2px 2px grey",
    },
    metricsSpansTopRow: {
      // border: "1px solid white",
      // color: "gold",
    },
    stepName: {
      boxSizing: "border-box",
      border: "1px solid white",
      padding: "0.3rem",
      textAlign: "center",
      margin: "1px",
      padding: "0.2rem",
      marginTop: "0.7rem",
      fontSize: "0.9em",
    },
    stpMetrics: {
      boxSizing: "border-box",
      border: "1px solid white",
      padding: "0.2rem",
      margin: "1px",
      fontSize: "0.9em",
      whiteSpace: "nowrap",
    },
  });

  return styles;
};
export default cssStyles;
