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
  const [metricToggle, setMetricToggle] = useState(true);
  const styles = cssStyles();
  rawStyles(getRawStyles());

  useEffect(hideOrShowMetricsDivs(metricToggle), []);

  useEffect(() => {
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

  return html`
    <div id="metrics-container" className="${styles.metricsContainer}">
      <div className="${styles.metricsDivs}">
        <span className="${styles.metricsSpans}">Value: ${value}</span>
      </div>
      <div className="${styles.metricsDivs}">
        <span className="${styles.metricsSpans}">FlwTm: ${flowTime}</span>
        <span className="${styles.metricsSpans}">ThrPt: ${throughPut}</span>
        <span className="${styles.metricsSpans}">Wip: ${wip}</span>
      </div>
      ${gSttngs().get("expdtQueueLength") > 0 &&
      html` <div className="${styles.metricsDivs}">
        <span className="${styles.metricsSpans}">FlwTmExp: ${flowTimeExp}</span>
        <span className="${styles.metricsSpans}"
          >ThrPtExp: ${throughPutExp}</span
        >
        <span className="${styles.metricsSpans}">WipExp: ${wipExp}</span>
      </div>`}
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
      gState().get("vQueue") !== undefined &&
      gState().get("flwTmQueue") !== undefined &&
      gState().get("thrPtQueue") !== undefined &&
      gState().get("wipQueue") !== undefined &&
      gState().get("flwTmExpQueue") !== undefined &&
      gState().get("thrPtExpQueue") !== undefined &&
      gState().get("wipExpdtQueue") !== undefined
    ) {
      // Only updated them if they have changed. Not sure it makes a difference.jkkk:w
      if (gState().get("flwTmQueue").flwItemMean() !== flowTime)
        setFlowTime(gState().get("flwTmQueue").flwItemMean());
      if (gState().get("thrPtQueue").dailyMean() !== throughPut)
        setThroughPut(gState().get("thrPtQueue").dailyMean());
      if (gState().get("wipQueue").dailyMean() !== wip)
        setWip(gState().get("wipQueue").dailyMean());
      if (gState().get("flwTmExpQueue").dailyMean() !== flowTimeExp)
        setFlowTimeExp(gState().get("flwTmExpQueue").dailyMean());
      if (gState().get("thrPtExpQueue").dailyMean() !== throughPutExp)
        setThroughPutExp(gState().get("thrPtExpQueue").dailyMean());
      if (gState().get("wipExpdtQueue").dailyMean() !== wip)
        setWipExp(gState().get("wipExpdtQueue").dailyMean());
      if (gState().get("vQueue").total() !== value)
        setValue(gState().get("vQueue").total());
    }
  }, 1000);
};
//------------------------------------------------------------------
// hideOrShowMetricsDiv()
//------------------------------------------------------------------
const hideOrShowMetricsDivs =
  (metricToggle) /*: () => void */ => () /*: void */ => {
    const metricsContainer = document.getElementById("metrics-container");
    if (metricsContainer !== null) {
      if (metricToggle === true) {
        metricsContainer.style.display = "block";
      } else {
        metricsContainer.style.display = "none";
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
  });

  return styles;
};

//------------------------------------------------------------------
// getRawStyles()
//------------------------------------------------------------------
const getRawStyles = () /*: Object */ => {
  const rawStyles = {};
  return rawStyles;
};
