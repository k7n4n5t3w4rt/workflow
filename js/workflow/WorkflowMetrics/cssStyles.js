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
      paddingBottom: "1.2rem",
    },
    metricsDivs: {
      display: "flex",
      flexWrap: "nowrap",
    },
    metricsSpans: {
      display: "block",
      boxSizing: "border-box",
      width: "33.3%",
      color: "white",
      textShadow: "2px 2px 2px grey",
    },
    stepName: {
      boxSizing: "border-box",
      border: "1px solid white",
      padding: "0.3rem",
      textAlign: "center",
      margin: "1px",
    },
    stepMetrics: {
      boxSizing: "border-box",
      border: "1px solid white",
      padding: "0.3rem",
      margin: "1px",
    },
  });

  return styles;
};
export default cssStyles;
