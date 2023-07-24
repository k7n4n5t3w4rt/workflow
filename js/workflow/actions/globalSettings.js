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
import calculateDevUnits from "./calculateDevUnits.js";
import calculateFlwTimeMax from "./calculateFlwTimeMax.js";
//------------------------------------------------------------------
// globalSettings()
//------------------------------------------------------------------
export default () => {
  gSttngs().setSid("workflowSttngs");
  //------------------------------------------------------------------
  // Development
  //------------------------------------------------------------------
  // Turns on some expensive debug features
  gSttngs().setNoCache("debug", false);
  // Starts the simulation automatically
  gSttngs().setNoCache("autoMode", false);
  // Toggle Easy storage
  gSttngs().setNoCache("easyStorage", true);
  //------------------------------------------------------------------
  // Workflow
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  // A lot of things depend on this setting
  gSttngs().setIfNotCached("strtAvrgFlwTime", 10);
  //------------------------------------------------------------------
  // Q: What steps do we have in our workflow?
  // Q: What WIP limits, if any, do we have for each step?
  // NOTE: We need to start with a "backlog" step, and end with a "done" step,
  // both of which have a limit of 0, which means "no limit".
  // Q: How many items are currently, or typically, or often in each step?
  gSttngs().setIfNotCached("steps", [
    {
      name: "Open",
      status: "backlog",
      limit: 0,
      preload: 0,
    },
    {
      name: "Ready",
      status: "wait",
      limit: 0,
      preload: 2,
    },
    {
      name: "In Progress",
      status: "touch",
      limit: 0,
      devUnits: 4,
      preload: 8,
    },
    {
      name: "Done",
      status: "done",
      limit: 0,
      preload: 0,
    },
  ]);
  gSttngs().set("avrgDevPowerPerClickPerStepPerDevUnit", calculateDevPower());
  // Q: What is the shortest flow time?
  gSttngs().setIfNotCached("flwTimeMin", 1);
  // Assume a normal distribution for now, and calculate
  // the longest flow time
  gSttngs().set("flwTimeMax", calculateFlwTimeMax());
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
  gSttngs().setIfNotCached("arrivalRate", 1);
  //------------------------------------------------------------------
  // Not yet used...
  //------------------------------------------------------------------
  // Format: A number between 0 and 1
  gSttngs().setIfNotCached("flwItmSizeLimit", 1);
  // PARAM: Inversely affects flwItmSize, i.e. if there is a value > 0, then the
  // effective flwItmSize is reduced by this factor
  // Format: True or False
  gSttngs().setIfNotCached("dfntnOfReady", false);
  // Q: How much drag is caused by silos, dependencies and handoffs?
  // Consider:
  // To what extent are people, as individuals, specialists (i.e. they only do
  // one thing)? What percentage of the total number of teams (including this one)
  // are "component teams" (i.e. teams that work on a single component of the
  // whole product)?
  // Format: A number between 0 and 1
  gSttngs().setIfNotCached("specialisation", 0);
  // Q: How much drag is caused by changes in the team structure?
  // Consider:
  // How often are people moved between teams? Do people or sub-teams come and go?
  // Format: A number between 0 and 1
  gSttngs().setIfNotCached("teamInstability", 0);
  //------------------------------------------------------------------
  // Calculated values:
  //------------------------------------------------------------------
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
  gSttngs().setIfNotCached("rangeMax", 0.25);
  gSttngs().setIfNotCached("rangeIncreaseRate", 1.25);
  gSttngs().setIfNotCached("rangeMidpoint", 0.1);
  gSttngs().set("colorGold", "f6ba00");
  gSttngs().set("colorGrey", "808080");
  gSttngs().set("colorGreen", "00ff00");
  gSttngs().set("colorBlue", "1d2570");
};
