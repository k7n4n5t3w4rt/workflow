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

  return html`
    <div id="metrics-container" className="${styles.metricsContainer}">
      <div>
        <span>Value: ${value}</span>
      </div>
      <div>
        <span>Flow Time: ${flowTime}</span>
        <span>Throughput: ${throughPut}</span>
        <span>WIP: ${wip}</span>
      </div>
      ${gSttngs().expdtLimit > 0 &&
      html` <div>
        <span>Flow Time Exp: ${flowTimeExp}</span>
        <span>Throughput Exp: ${throughPutExp}</span>
        <span>WIP Exp: ${wipExp}</span>
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
      zIndex: "10000",
      boxSizing: "border-box",
      width: "100%",
      padding: "0.5rem",
      backgroundColor: "rgba(0, 0, 0, 0)",
      color: "white",
      textShadow: "2px 2px 2px grey",
      paddingBottom: "1.2rem",
    },
  });

  return styles;
};

//------------------------------------------------------------------
// getRawStyles()
//------------------------------------------------------------------
const getRawStyles = () /*: Object */ => {
  const rawStyles = {
    div: {
      display: "flex",
      flexWrap: "nowrap",
    },
    span: {
      display: "block",
      boxSizing: "border-box",
      width: "33.3%",
      color: "white",
      textShadow: "2px 2px 2px grey",
    },
  };
  return rawStyles;
};
