// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
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
import updateStepMetrics from "../actions/updateStepMetrics.js";
//------------------------------------------------------------------
// Steps()
//------------------------------------------------------------------
/*::
type Props = {
}
*/
export const Steps = (props /*: Props */) /*: string */ => {
  // Styles
  const [styles /*: Object */, setStyles /*: function */] = useState({});
  useEffect(() => {
    rawStyles(getRawStyles());
    setStyles(cssStyles());
  }, []);
  // A toggle to show or hide the settings
  const [paramsToggle, setParamsToggle] = useState(false);
  const [steps, setSteps] = useState([]);
  // Hide or show the settings divs when the toggle changes
  // The function that toggles the settings by setting the toggle
  // to whatever it isn't
  const toggleParams = () => {
    setParamsToggle(!paramsToggle);
  };
  // THIS FUNCTION HAS BEEN CHANGD - IT NO LONGER SETS THE STATE
  // Once, on load, update the local state from the global state
  return html`
    <!------------------------------------------------------------------>
    <!-- Steps -->
    <!------------------------------------------------------------------>
    <div className="${styles.metricsDivs}">
      ${(steps || []).map(
        (step /*: FlwStep */, index /*: number */) /*: void */ => {
          if (step.status === "done") return html``;
          return html`
            <div className="${styles.metricsSpans}">
              <div className="${styles.stepName}">${step.name}</div>
              <div className="${styles.stpMetrics}">
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
  `;
  //   </fieldset>
  // </div>
};
export default Steps;
