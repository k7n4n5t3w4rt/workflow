// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import {
  useEffect,
  useState,
  useReducer,
} from "../../../web_modules/preact/hooks.js";
import { html } from "../../../web_modules/htm/preact.js";
import Steps from "./Steps.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
import updateMetricsOnClickInterval from "./updateMetricsOnClickInterval.js";
import cssStyles from "./cssStyles.js";
import getRawStyles from "./getRawStyles.js";
//------------------------------------------------------------------
// Metrics()
//------------------------------------------------------------------
/*::
type Props = {
}
*/
export const Metrics = (props /*: Props */) /*: string */ => {
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
        <div className="${styles.metricsSpans}">TmBox: ${tmBox}</div>
        <div className="${styles.metricsSpans}">Value: ${value}</div>
        <div className="${styles.metricsSpans}">ThruPut: ${thruPut}</div>
      </div>
      <div className="${styles.metricsDivs}">
        <div className="${styles.metricsSpans}">FlwTm: ${flowTime}</div>
        <div className="${styles.metricsSpans}">ThrPt: ${thruPutPerDay}</div>
        <div className="${styles.metricsSpans}">Wip: ${wip}</div>
      </div>
      ${gSttngs().get("expdtQueueLength") > 0 &&
      html` <div className="${styles.metricsDivs}">
        <div className="${styles.metricsSpans}">FlwTmExp: ${flowTimeExp}</div>
        <div className="${styles.metricsSpans}"
          >ThrPtExp: ${thruPutExpPerDay}</span
        >
        <div className="${styles.metricsSpans}">WipExp: ${wipExp}</div>
      </div>`}
      <${Steps} />
    </div>
  `;
};
export default Metrics;
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