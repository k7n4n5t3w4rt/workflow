// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./actions/gSttngs.js";
import gState from "./actions/gState.js";
import globalSettings from "./actions/globalSettings.js";
import globalState from "./actions/globalState.js";
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
	flowTimeExp: number,
	throughPutExp: number,
	wipExp: number,
	value: number,
}
*/
export default (props /*: Props */) /*: string */ => {
  // Metrics
  const [flowTime /*: number */, setFlowTime /*: function */] = useState(0);
  const [throughPut /*: number */, setThroughPut /*: function */] = useState(0);
  const [wip /*: number */, setWip /*: function */] = useState(0);
  const [flowTimeExp /*: number */, setFlowTimeExp /*: function */] =
    useState(0);
  const [throughPutExp /*: number */, setThroughPutExp /*: function */] =
    useState(0);
  const [wipExp /*: number */, setWipExp /*: function */] = useState(0);
  const [value /*: number */, setValue /*: function */] = useState(0);
  const [metricToggle, setMetricToggle] = useState(false);
  const styles = cssStyles();
  rawStyles(getRawStyles());

  useEffect(hideOrShowMetricsDivs(metricToggle), [metricToggle]);

  useEffect(() => {
    // setFps(gSttngs().fps);
    // setWipLimit(gSttngs().wipLimit);
    // setupMobileDebug();
    updateMetricsOnClickInterval(
      setFlowTime,
      flowTime,
      setThroughPut,
      throughPut,
      setWip,
      wip,
      setFlowTimeExp,
      flowTimeExp,
      setThroughPutExp,
      throughPutExp,
      setWipExp,
      wipExp,
      setValue,
      value,
    );
  }, []);

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
      <div>Value: ${value}</div>
      <div>Flow Time: ${flowTime}</div>
      <div>Throughput: ${throughPut}</div>
      <div>WIP: ${wip}</div>
      ${gSttngs().expdtLimit > 0 &&
      html`
        <div>Flow Time Exp.: ${flowTimeExp}</div>
        <div>Throughput Exp.: ${throughPutExp}</div>
        <div>WIP Exp.: ${wipExp}</div>
      `}
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
// updateMetricsOnClickInterval()
//------------------------------------------------------------------
const updateMetricsOnClickInterval = (
  setFlowTime /*: function */,
  flowTime /*: number */,
  setThroughPut /*: function */,
  throughPut /*: number */,
  setWip /*: function */,
  wip /*: number */,
  setFlowTimeExp /*: function */,
  flowTimeExp /*: number */,
  setThroughPutExp /*: function */,
  throughPutExp /*: number */,
  setWipExp /*: function */,
  wipExp /*: number */,
  setValue /*: function */,
  value /*: number */,
) /*: void */ => {
  setInterval(() => {
    if (
      gState().vQueue !== undefined &&
      gState().flwTmQueue !== undefined &&
      gState().thrPtQueue !== undefined &&
      gState().wipQueue !== undefined &&
      gState().flwTmExpQueue !== undefined &&
      gState().thrPtExpQueue !== undefined &&
      gState().wipExpQueue !== undefined
    ) {
      // Only updated them if they have changed. Not sure it makes a difference.jkkk:w
      if (gState().flwTmQueue.meanForValues() !== flowTime)
        setFlowTime(gState().flwTmQueue.meanForValues());
      if (gState().thrPtQueue.meanForDays() !== throughPut)
        setThroughPut(gState().thrPtQueue.meanForDays());
      if (gState().wipQueue.meanForDays() !== wip)
        setWip(gState().wipQueue.meanForDays());
      if (gState().flwTmExpQueue.meanForValues() !== flowTimeExp)
        setFlowTimeExp(gState().flwTmExpQueue.meanForValues());
      if (gState().thrPtExpQueue.meanForDays() !== throughPutExp)
        setThroughPutExp(gState().thrPtExpQueue.meanForDays());
      if (gState().wipExpQueue.meanForDays() !== wip)
        setWipExp(gState().wipExpQueue.meanForDays());
      if (gState().vQueue.total !== value) setValue(gState().vQueue.total());
    }
  }, 1000);
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
