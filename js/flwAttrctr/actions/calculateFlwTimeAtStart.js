// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// calculateFlwTimeAtStart()
//------------------------------------------------------------------
const calculateFlwTimeAtStart = () /*: number */ => {
  const steps = gSttngs().get("steps");
  if (steps !== undefined) {
    return steps.reduce((_ /*: number*/, step /*: Object*/) => {
      if (step.status === "touch") {
        return _ + step.flwTimeAtStart;
      } else {
        return _;
      }
    }, 0);
  } else {
    setTimeout(calculateFlwTimeAtStart, 1000);
    return 0;
  }
};
export default calculateFlwTimeAtStart;
