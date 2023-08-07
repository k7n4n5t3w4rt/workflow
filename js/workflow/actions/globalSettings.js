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
export default () /*: void */ => {
  gSttngs().setSidIfNotInLocalStore("workflowSttngs");
  //------------------------------------------------------------------
  // Development
  //------------------------------------------------------------------
  // Starts the simulation automatically
  gSttngs().setNoCacheIfNotInLocalStorageAddToLocalStorage("autoMode", false);
  // Toggle Easy storage
  gSttngs().setNoCacheIfNotInLocalStorageAddToLocalStorage("easyStorage", true);
  //------------------------------------------------------------------
  // Workflow
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  // A lot of things depend on this setting
  gSttngs().setIfNotCached("avrgFlwTimeAtStart", 10);
  // A fix to get the flow time correct
  gSttngs().setIfNotCached("devPowerFix", 1);
  // The drag that kicks in when the ratio of dev units to WIP is 1:2
  gSttngs().setIfNotCached("drag", 0.5);
  // Q: What is the shortest flow time?
  gSttngs().setIfNotCached("flwTimeMin", 10); // Max. flow time is dynamic
  // Q: What interval do we use for timeboxing or reporting (in working days)?
  gSttngs().setIfNotCached("timeBox", 10);
  // Q: Things that take too long to deliver, often lose their value. Do we have
  // an interval (in working days) after which we check in with the customer/stakeholder
  // to see if they still want the thing we're working on, and reset the priority?
  gSttngs().setIfNotCached("death", 0);
  gSttngs().setIfNotCached("backlogDeath", 0);
  // PARAM: How many things do we expedite each timebox?
  gSttngs().setIfNotCached("expdtQueueLength", 0);
  // 1 is 100% of the available devUnits.
  gSttngs().setIfNotCached("expdtDvUnitsFactor", 1);
  // Q: How many new items arrive in your backlog each day?
  gSttngs().setIfNotCached("arrivalRate", 5);
  // Format: A number between 0 and and 1
  gSttngs().setIfNotCached("flwItmSizeLimit", 1);
  // Q: At what flwItmSizeLimit do we get 0.8 of the value from a flow item?
  gSttngs().setIfNotCached("paretoPoint", 0.2);
  //------------------------------------------------------------------
  // Display
  //------------------------------------------------------------------
  gSttngs().setIfNotCached("fps", 1);
  gSttngs().setIfNotCached("scaleCm", 7);
  gSttngs().setIfNotCached("showMetrics", true);
  gSttngs().set("scale", gSttngs().get("scaleCm") / 100);
  gSttngs().set("x", gSttngs().get("scale"));
  gSttngs().set("y", gSttngs().get("scale"));
  gSttngs().set("z", gSttngs().get("scale"));
  gSttngs().set("step", round2Places(gSttngs().get("scale") * 5));
  gSttngs().set("yOffset", round2Places(gSttngs().get("scale") * 10));
  // Temporarily making these editable in the UI
  gSttngs().setIfNotCached("rangeMax", 7);
  gSttngs().setIfNotCached("rangeIncreaseRate", 0.25);
  gSttngs().setIfNotCached("rangeMidpoint", 0.1);
  gSttngs().set("colorGold", "f6ba00");
  gSttngs().set("colorGrey", "808080");
  gSttngs().set("colorGreen", "00ff00");
  gSttngs().set("colorBlue", "1d2570");
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
