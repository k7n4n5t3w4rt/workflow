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
import calculateTotalWipLimits from "./actions/calculateTotalWipLimits.js";
import calculateFlwTimeMax from "./actions/calculateFlwTimeMax.js";
import calculateFlwTimeAtStart from "./actions/calculateFlwTimeAtStart.js";

/*::
type Props = {
}
*/
export default (props /*: Props */) /*: string */ => {
  // Metrics
  const [flowTime /*: number */, setFlowTime /*: function */] = useState(0);
  const [thruPut /*: number */, setThruPut /*: function */] = useState(0);
  const [thruPutPerDay /*: number */, setThruPutPerDay /*: function */] =
    useState(0);
  const [thruPutExpPerDay /*: number */, setThruPutExpPerDay /*: function */] =
    useState(0);
  const [wip /*: number */, setWip /*: function */] = useState(0);
  const [flowTimeExp /*: number */, setFlowTimeExp /*: function */] =
    useState(0);
  const [wipExp /*: number */, setWipExp /*: function */] = useState(0);
  const [value /*: number */, setValue /*: function */] = useState(0);
  const [tmBox /*: number */, setTmBox /*: function */] = useState(0);
  const [metricToggle, setMetricToggle] = useState(true);
  const styles = cssStyles();
  rawStyles(getRawStyles());

  useEffect(hideOrShowMetricsDivs(metricToggle), []);

  useEffect(() => {
    updateMetricsOnClickInterval(
      setFlowTime,
      flowTime,
      setThruPut,
      thruPut,
      setThruPutPerDay,
      thruPutPerDay,
      setThruPutExpPerDay,
      thruPutExpPerDay,
      setWip,
      wip,
      setFlowTimeExp,
      flowTimeExp,
      setWipExp,
      wipExp,
      setValue,
      value,
      setTmBox,
      tmBox,
    );
  }, []);

  return html`
    <div id="metrics-container" className="${styles.metricsContainer}">
      <div className="${styles.metricsDivs}">
        <span className="${styles.metricsSpans}">TmBox: ${tmBox}</span>
        <span className="${styles.metricsSpans}">Value: ${value}</span>
        <span className="${styles.metricsSpans}">ThruPut: ${thruPut}</span>
      </div>
      <div className="${styles.metricsDivs}">
        <span className="${styles.metricsSpans}">FlwTm: ${flowTime}</span>
        <span className="${styles.metricsSpans}">ThrPt: ${thruPutPerDay}</span>
        <span className="${styles.metricsSpans}">Wip: ${wip}</span>
      </div>
      ${gSttngs().get("expdtQueueLength") > 0 &&
      html` <div className="${styles.metricsDivs}">
        <span className="${styles.metricsSpans}">FlwTmExp: ${flowTimeExp}</span>
        <span className="${styles.metricsSpans}"
          >ThrPtExp: ${thruPutExpPerDay}</span
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
  setThruPut /*: function */,
  thruPut /*: number */,
  setThruPutPerDay /*: function */,
  throughPutPerDay /*: number */,
  setThruPutExpPerDay /*: function */,
  throughPutExpPerDay /*: number */,
  setWip /*: function */,
  wip /*: number */,
  setFlowTimeExp /*: function */,
  flowTimeExp /*: number */,
  setWipExp /*: function */,
  wipExp /*: number */,
  setValue /*: function */,
  value /*: number */,
  setTimeBox /*: function */,
  tmBox /*: number */,
) /*: void */ => {
  setInterval(() => {
    if (
      gState().get("vQueue") !== undefined &&
      gState().get("flwTmQueue") !== undefined &&
      gState().get("thrPtQueue") !== undefined &&
      gState().get("wipQueue") !== undefined &&
      gState().get("flwTmExpQueue") !== undefined &&
      gState().get("thrPtExpQueue") !== undefined &&
      gState().get("wipExpQueue") !== undefined &&
      gSttngs().get("timeBox") !== undefined
    ) {
      // Some shorter names
      const tmBox = gSttngs().get("timeBox");
      const thrPutPerDay = gState().get("thrPtQueue").dailyMean();
      const thrPutExpPerDay = gState().get("thrPtExpQueue").dailyMean();
      const thrPut = thrPutExpPerDay * tmBox + thrPutPerDay * tmBox;
      const flwTimeAtStart = calculateFlwTimeAtStart();
      const flwTimeMax = calculateFlwTimeMax();
      const totalWipAtStart = calculateTotalWipLimits();
      const flwTime = gState().get("flwTmQueue").flwItemMean();
      const flwTmExp = gState().get("flwTmExpQueue").flwItemMean();
      const wip = gState().get("wipQueue").dailyMean();
      const wipExp = gState().get("wipExpQueue").dailyMean();
      // Update the metrics
      setFlowTime(flwTime);
      setThruPut(thrPut);
      setThruPutPerDay(thrPutPerDay);
      setWip(wip);
      setFlowTimeExp(flwTmExp);
      setThruPutExpPerDay(thrPutExpPerDay);
      setWipExp(wipExp);
      setTimeBox((tmBox / 5).toString() + " wks");
      // Caclulate the value as a percentage of the ideal throughput:
      // Little's Law = ThruPut = WIP/FlowTime
      const totalValue = gState().get("vQueue").total();
      // Before any adjustments based on flwSizeLimit, value is the same as scale
      const avrgValuePerItem = flwTimeAtStart / flwTimeMax;
      // There is, currently, an even distribution of value across all items
      // there is a direct mapping of value to the flow time This will need to change,
      //  [a] when we have a more realistic distribution of value across items, and
      //  [b] when we have a more realistic system of assigning value to items.
      const totalThruPut = (totalWipAtStart / flwTimeAtStart) * tmBox;
      const displayValue = (totalValue / avrgValuePerItem / totalThruPut) * 100;
      // Format the display value as a percentage
      setValue(Math.floor(displayValue).toString() + "%");
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
