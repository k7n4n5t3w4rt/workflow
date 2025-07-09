// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import cleanInt from "../calculations/cleanInt";
import round2Places from "../calculations/round2Places";
import calculateDevPower from "./calculateDevPower";
import touchStepsCount from "./touchStepsCount";
//------------------------------------------------------------------
// globalSettings()
//------------------------------------------------------------------
export default async () /*: Promise<void> */ => {
  //------------------------------------------------------------------
  // Q: What steps do we have in our workflow?
  // Q: What WIP limits, if any, do we have for each step?
  // NOTE: We need to start with a "backlog" step, and end with a "done" step,
  // both of which have a limit of 0, which means "no limit".
  // Q: How many items are currently, or typically, or often in each step?
  const steps = await gSttngs().setIfNotCached("steps", [
    {
      name: "Open",
      status: "backlog",
      limit: 10,
      movingLimit: 10,
    },
    {
      name: "Ready",
      status: "wait",
      limit: 10,
      movingLimit: 10,
    },
    {
      name: "In Progress",
      status: "touch",
      limit: 10,
      movingLimit: 10,
      devUnits: 5,
      movingDevUnits: 5,
      flwTimeAtStart: 5,
      actualFlwTime: 5,
    },
    {
      name: "Ready for Test",
      status: "wait",
      limit: 0,
      movingLimit: 0,
    },
    {
      name: "In Test",
      status: "touch",
      limit: 10,
      movingLimit: 10,
      devUnits: 5,
      movingDevUnits: 5,
      flwTimeAtStart: 5,
      actualFlwTime: 7.5,
    },
    {
      name: "Done",
      status: "done",
      limit: 0,
      movingLimit: 0,
    },
  ]);
  return;
};
