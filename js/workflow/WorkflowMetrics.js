// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./actions/gSttngs.js";
import gState from "./actions/gState.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../web_modules/preact/hooks.js";
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

/*::
type Props = {
	flowTime: number,
	throughPut: number,
	wip: number,
	value: number,
}
*/
export default (props /*: Props */) /*: string */ => {
  const [metricToggle, setMetricToggle] = useState(false);
  const styles = cssStyles();
  rawStyles(getRawStyles());

  useEffect(hideOrShowMetricsDivs(metricToggle), [metricToggle]);

  const toggleMetric = () /*: void */ => {
    setMetricToggle(!metricToggle);
  };

  return html`
    <div
      id="metrics-close-icon"
      className="${styles.metricsClose}"
      onClick="${toggleMetric}"
    >
      <span className="material-icons ${styles.metricsIcon}"> close </span>
    </div>
    <div id="metrics-container" className="${styles.metricsContainer}">
      <div>Value: ${props.value}</div>
      <div>Flow Time: ${props.flowTime}</div>
      <div>Throughput: ${props.throughPut}</div>
      <div>WIP: ${props.wip}</div>
    </div>
    <div
      id="metrics-icon"
      className="${styles.metrics}"
      onClick="${toggleMetric}"
    >
      <span className="material-icons ${styles.metricsIcon}">
        data_exploration
      </span>
    </div>
  `;
};

//------------------------------------------------------------------
// hideOrShowMetricsDiv()
//------------------------------------------------------------------
const hideOrShowMetricsDivs =
  (metricToggle) /*: () => void */ => () /*: void */ => {
    const metricsContainer = document.getElementById("metrics-container");
    const metricsIcon = document.getElementById("metrics-icon");
    const metricsCloseIcon = document.getElementById("metrics-close-icon");
    if (
      metricsContainer !== null &&
      metricsIcon !== null &&
      metricsCloseIcon !== null
    ) {
      if (metricToggle === true) {
        metricsContainer.style.display = "block";
        metricsIcon.style.display = "none";
        metricsCloseIcon.style.display = "block";
      } else {
        metricsContainer.style.display = "none";
        metricsIcon.style.display = "block";
        metricsCloseIcon.style.display = "none";
      }
    }
  };

//------------------------------------------------------------------
// cssStyles()
//------------------------------------------------------------------
const cssStyles = () /*: Object */ => {
  // A seed for getting unique class names
  setSeed(seedString("flwmetrics"));

  const [styles] = createStyles({
    metricsContainer: {
      position: "absolute",
      zIndex: "10000",
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      padding: "1rem",
      paddingTop: "3rem",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      color: "white",
    },
    metrics: {
      position: "absolute",
      zIndex: "10000",
      boxSizing: "border-box",
      bottom: ".4rem",
      left: ".4rem",
      cursor: "pointer",
    },
    metricsIcon: {
      fontSize: "54px",
      color: "white",
    },
    metricsClose: {
      position: "absolute",
      zIndex: "20000",
      boxSizing: "border-box",
      top: ".4rem",
      right: ".4rem",
      cursor: "pointer",
    },
    metricsCloseIcon: {
      fontSize: "54px",
      color: "white",
    },
  });

  return styles;
};

//------------------------------------------------------------------
// getRawStyles()
//------------------------------------------------------------------
const getRawStyles = () /*: Object */ => {
  const rawStyles = {
    output: {
      display: "block",
      float: "left",
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
    },
    label: {
      display: "block",
      float: "left",
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
    },
    ["input[type=range]"]: {},
  };
  return rawStyles;
};
