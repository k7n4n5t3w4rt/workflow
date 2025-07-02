// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import cleanInt from "../calculations/cleanInt.js";
import round2Places from "../calculations/round2Places.js";
import calculateDevPower from "./calculateDevPower.js";
import touchStepsCount from "./touchStepsCount.js";
//------------------------------------------------------------------
// globalSettings()
//------------------------------------------------------------------
export default async () /*: Promise<void> */ => {
  gSttngs().setSidIfNotInLocalStore("START");
  //------------------------------------------------------------------
  // Development
  //------------------------------------------------------------------
  // Starts the simulation automatically
  // gSttngs().setNoCacheIfNotInLocalStorageAddToLocalStorage("autoMode", false);
  gSttngs().setIfNotCached("autoMode", false);
  // Toggle Easy storage
  // gSttngs().setNoCacheIfNotInLocalStorageAddToLocalStorage(
  //   "easyStorage",
  //   false,
  // );
  gSttngs().setIfNotCached("easyStorage", false);
  //------------------------------------------------------------------
  // Workflow
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  // A fix to get the flow time correct
  const devPowerFix = await gSttngs().setIfNotCached("devPowerFix", 2.23);
  // The drag that kicks in when the ratio of dev units to WIP is 1:2
  const drag = await gSttngs().setIfNotCached("drag", 0);
  // The point at which the drag kicks in 1:2 = 0.5, 1:3 = 0.33, 1:4 = 0.25
  const dragPoint = await gSttngs().setIfNotCached("dragPoint", 0.5);
  // Q: At what flwItmSizeLimit do we get 0.8 of the value from a flow item?
  const paretoPoint = await gSttngs().setIfNotCached("paretoPoint", 0.2);
  // Q: How many new items arrive in your backlog each day?
  const arrivalRate = await gSttngs().setIfNotCached("arrivalRate", 10);
  // Q: What is the shortest flow time?
  const flwTimeMin = await gSttngs().setIfNotCached("flwTimeMin", 1); // Max. flow time is dynamic
  // Q: What interval do we use for timeboxing or reporting (in working days)?
  const timeBox = await gSttngs().setIfNotCached("timeBox", 10);
  // PARAM: How many things do we expedite each timebox?
  const expdtQueueLength = await gSttngs().setIfNotCached(
    "expdtQueueLength",
    0,
  );
  // 1 is 100% of the available devUnits.
  const expdtDvUnitsFactor = await gSttngs().setIfNotCached(
    "expdtDvUnitsFactor",
    1,
  );
  // Format: A number between 0 and and 1
  const flwItmSizeLimit = await gSttngs().setIfNotCached("flwItmSizeLimit", 1);
  const numberOfSteps = await gSttngs().setIfNotCached("numberOfSteps", 6);
  //------------------------------------------------------------------
  // Display
  //------------------------------------------------------------------
  const rangeMax = await gSttngs().setIfNotCached("rangeMax", 10);
  const rangeIncreaseRate = await gSttngs().setIfNotCached(
    "rangeIncreaseRate",
    0.1,
  );
  const rangeMidpoint = await gSttngs().setIfNotCached("rangeMidpoint", 0.1);
  const fps = await gSttngs().setIfNotCached("fps", 1);
  const showMetrics = await gSttngs().setIfNotCached("showMetrics", true);
  gSttngs().set("colorGold", "f6ba00");
  gSttngs().set("colorGrey", "808080");
  gSttngs().set("colorGreen", "00ff00");
  gSttngs().set("colorBlue", "1d2570");
  gSttngs().setIfNotCached("paramsMaxWip", 20);
  // We'll await scaleCM one because it is required for setting some other values
  const scaleCm = await gSttngs().setIfNotCached("scaleCm", 2);
  const scale = gSttngs().set("scale", scaleCm / 100);
  gSttngs().set("x", scale);
  gSttngs().set("y", scale);
  gSttngs().set("z", scale);
  gSttngs().set("step", round2Places(scale * 5));
  gSttngs().set("yOffset", round2Places(scale * 10));
  //------------------------------------------------------------------
  // Not yet used...
  //------------------------------------------------------------------
  // Q: Things that take too long to deliver, often lose their value. Do we have
  // an interval (in working days) after which we check in with the customer/stakeholder
  // to see if they still want the thing we're working on, and reset the priority?
  const death = await gSttngs().setIfNotCached("death", 0);
  const backlogDeath = await gSttngs().setIfNotCached("backlogDeath", 0);
  gSttngs().setIfNotCached("devUnitsTerm", "Devs");
  gSttngs().setIfNotCached("displayName", "FlowAttractor");
  return;
};
//------------------------------------------------------------------
// Not yet used...
//------------------------------------------------------------------
// PARAM: Inversely affects flwItmSize, i.e. if there is a value > 0, then the
// effective flwItmSize is reduced by this factor
// Format: True or False
// gSttngs().setIfNotCached("dfntnOfReady", false);
// Q: How much drag is caused by silos, dependencies and handoffs?
// Consider:
// To what extent are people, as individuals, specialists (i.e. they only do
// one thing)? What percentage of the total number of teams (including this one)
// are "component teams" (i.e. teams that work on a single component of the
// whole product)?
// Format: A number between 0 and 1
// gSttngs().setIfNotCached("specialisation", 0);
// Q: How much drag is caused by changes in the team structure?
// Consider:
// How often are people moved between teams? Do people or sub-teams come and go?
// Format: A number between 0 and 1
// gSttngs().setIfNotCached("teamInstability", 0);
