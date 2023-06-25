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
    // setFps(gSttngs().get("fps"));
    // setWipLimit(gSttngs().get("wipLimit"));
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

  return html`
    <div id="metrics-container" className="${styles.metricsContainer}">
      <div className="${styles.metricsDivs}">
        <span className="${styles.metricsSpans}">Value: ${value}</span>
      </div>
      <div className="${styles.metricsDivs}">
        <span className="${styles.metricsSpans}">Flow Time: ${flowTime}</span>
        <span className="${styles.metricsSpans}"
          >Throughput: ${throughPut}</span
        >
        <span className="${styles.metricsSpans}">WIP: ${wip}</span>
      </div>
      ${gSttngs().get("expdtLimit") > 0 &&
      html` <div className="${styles.metricsDivs}">
        <span className="${styles.metricsSpans}"
          >Flow Time Exp: ${flowTimeExp}</span
        >
        <span className="${styles.metricsSpans}"
          >Throughput Exp: ${throughPutExp}</span
        >
        <span className="${styles.metricsSpans}">WIP Exp: ${wipExp}</span>
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
      gState().get("wipExpQueue") !== undefined
    ) {
      // Only updated them if they have changed. Not sure it makes a difference.jkkk:w
      if (gState().get("flwTmQueue").meanForValues() !== flowTime)
        setFlowTime(gState().get("flwTmQueue").meanForValues());
      if (gState().get("thrPtQueue").meanForDays() !== throughPut)
        setThroughPut(gState().get("thrPtQueue").meanForDays());
      if (gState().get("wipQueue").meanForDays() !== wip)
        setWip(gState().get("wipQueue").meanForDays());
      if (gState().get("flwTmExpQueue").meanForValues() !== flowTimeExp)
        setFlowTimeExp(gState().get("flwTmExpQueue").meanForValues());
      if (gState().get("thrPtExpQueue").meanForDays() !== throughPutExp)
        setThroughPutExp(gState().get("thrPtExpQueue").meanForDays());
      if (gState().get("wipExpQueue").meanForDays() !== wip)
        setWipExp(gState().get("wipExpQueue").meanForDays());
      if (gState().get("vQueue").total !== value)
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
