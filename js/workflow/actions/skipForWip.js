// @flow
//------------------------------------------------------------------
// mysterioudWipFactor()
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";

export default (devUnits /*: number */, wip /*: number */) /*: boolean */ => {
  // If there is no WIP or no devs, return 0
  if (wip <= 0 || devUnits <= 0) {
    return true;
  }
  // There are plenty of devs for the WIP
  if (devUnits >= wip) {
    return false;
  }
  // So that we can increase the probability of skipping
  // by increasing the WIP by > * 1
  // e.g. if drag is 0.25, then dragFacor will be 1.25
  const dragFactor = 1 + gSttngs().drag;

  // If the random number is more than the probability (a/b), return false
  const skip = Math.random() > devUnits / (wip * dragFactor);
  return skip;
};
