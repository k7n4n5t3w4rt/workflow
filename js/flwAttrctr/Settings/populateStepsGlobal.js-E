// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpFlwMap from "../actions/setUpFlwMap.js";
//------------------------------------------------------------------
// populateStepsGlobal()
//------------------------------------------------------------------
export const populateStepsGlobal = () /*: void */ => {
  if (
    gSttngs().get("steps") === undefined ||
    gSttngs().get("numberOfSteps") === undefined
  ) {
    return;
  }
  const steps = gSttngs().get("steps");
  const numberOfSteps = gSttngs().get("numberOfSteps");
  if (numberOfSteps < steps.length) {
    while (numberOfSteps < steps.length) {
      steps.pop();
    }
  } else if (numberOfSteps > steps.length) {
    // The last step, if it exists, is always done
    if (steps.length > 0) steps[steps.length - 1].status = "wait";
    while (numberOfSteps > steps.length) {
      steps.push({
        name: "Step " + (steps.length + 1),
        status: "wait",
        limit: 0,
        movingLimit: 0,
        devUnits: 0,
        movingDevUnits: 0,
        flwTimeAtStart: 1,
        actualFlwTime: 1,
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
  gSttngs().set("steps", steps);
  // Regenerate the flwMap
  setUpFlwMap();
};
export default populateStepsGlobal;
