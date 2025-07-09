// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpFlwMap from "../actions/setUpFlwMap";
//------------------------------------------------------------------
// populateSteps()
//------------------------------------------------------------------
/*::
type Props = {
  numberOfSteps: number,
}
*/
export const populateSteps =
  (
    props /*: Props */,
    steps /*: Array<FlwStep> */,
    setSteps /*: (any) => void */,
  ) /*: () => void */ =>
  () /*: void */ => {
    if (
      steps === undefined ||
      props.numberOfSteps === undefined ||
      steps.length === undefined ||
      props.numberOfSteps === 0 ||
      steps.length === 0
    ) {
      return;
    }
    if (props.numberOfSteps < steps.length) {
      while (props.numberOfSteps < steps.length) {
        steps.pop();
      }
    } else if (props.numberOfSteps > steps.length) {
      // The last step, if it exists, is always done
      if (steps.length > 0) steps[steps.length - 1].status = "wait";
      while (props.numberOfSteps > steps.length) {
        steps.push({
          name: "Step " + (steps.length + 1),
          status: "wait",
          limit: 0,
          movingLimit: 0,
          devUnits: 0,
          movingDevUnits: 0,
          flwTimeAtStart: 1,
          actualFlwTime: 1,
          avAge: 0,
        });
      }
    }
    // The first step is always backlog
    steps[0].status = "backlog";
    // The last step is always done
    steps[steps.length - 1].status = "done";
    steps.forEach((step /*: FlwStep */, index /*: number */) => {
      step.limit = step.limit || 0;
      step.movingLimit = step.limit;
      if (step.status !== "touch") {
        step.devUnits = 0;
        step.flwTimeAtStart = 0;
        step.actualFlwTime = 0;
      }
      if (step.status === "touch") {
        step.devUnits = step.devUnits || 0;
        step.devUnits = step.devUnits;
        step.flwTimeAtStart = step.flwTimeAtStart || 1;
        step.actualFlwTime = step.actualFlwTime || 1;
      }
      if (step.status === "done") {
        step.limit = 0;
        step.movingLimit = 0;
      }
    });
    setSteps(steps);
    gSttngs().set("steps", steps);
    // Regenerate the flwMap
    setUpFlwMap();
  };
export default populateSteps;
