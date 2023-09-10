// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gState from "../actions/gState.js";
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
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
import updateMetricsOnClickInterval from "./updateMetricsOnClickInterval.js";
import cssStyles from "./cssStyles.js";
import getRawStyles from "./getRawStyles.js";
import getFlwMpSteps from "../actions/getFlwMpSteps.js";
//------------------------------------------------------------------
// Steps()
//------------------------------------------------------------------
/*::
type Props = {
}
*/
export const Steps = (props /*: Props */) /*: string */ => {
  // Styles
  const styles = cssStyles();
  rawStyles(getRawStyles());
  // A toggle to show or hide the settings
  const [paramsToggle, setParamsToggle] = useState(false);
  const [steps, setSteps] = useState([]);
  // Hide or show the settings divs when the toggle changes
  // The function that toggles the settings by setting the toggle
  // to whatever it isn't
  const toggleParams = () => {
    setParamsToggle(!paramsToggle);
  };
  // Once, on load, update the local state from the global state
  useEffect(updateStepsStateFromGlobalState(setSteps), []);
  return html`
    <!------------------------------------------------------------------>
    <!-- Steps -->
    <!------------------------------------------------------------------>
    <!--
    <div className="${styles.metricsDivs}">
      ${(steps || []).map(
      (step /*: FlwStep */, index /*: number */) /*: void */ => {
        if (step.status === "done") return html``;
        return html`
          <div className="${styles.metricsSpans}">
            <div className="${styles.stepName}">${step.name}</div>
            <div className="${styles.stepMetrics}">
              Limit: ${(step.movingLimit || 0).toString()}<br />
              Av.Ag: ${(step.avAge || 0).toString()}<br />
              ${step.status === "touch" &&
              html`DvUnts: ${(step.movingDevUnits || 0).toString()}`}<br />
            </div>
          </div>
        `;
      },
    )}
    </div>
    -->
  `;
  //   </fieldset>
  // </div>
};
export default Steps;
//------------------------------------------------------------------
// updateStepsStateFromGlobalState()
//------------------------------------------------------------------
const updateStepsStateFromGlobalState =
  (setSteps /*: (any) => void */) /*: () => void */ => () /*: void */ => {
    setTimeout(updateStepsStateFromGlobalState(setSteps), 1000);
    const isUpdtngCnfg = gState().get("isUpdtngCnfg");
    if (isUpdtngCnfg === true) {
      return;
    }
    const steps = gSttngs().get("steps");
    getFlwMpSteps().forEach(
      (flwMpStep /*: FlwItem[] */, index /*: number */) /*: void */ => {
        if (steps[index] === undefined) return;
        steps[index].avAge = 0;
        const flwItemAges /*: Array<number> */ = [];
        flwMpStep.forEach((flwItem /*: FlwItem */) => {
          flwItemAges.push(flwItem.dStepsAges[index.toString()]);
        });
        const avAge =
          flwItemAges.reduce((acc, num) => acc + num, 0) / flwItemAges.length;
        if (isNaN(avAge)) return;
        steps[index].avAge = Math.round(avAge * 100) / 100;
      },
    );
    setSteps(steps);
  };
