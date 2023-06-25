// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import cleanInt from "../calculations/cleanInt.js";

/*::
type Props = {
	fps?: string,
	scalecm?: string,
	stepcm?: string,
  devunits?: string,
  devstreams?: string,
}
*/
//------------------------------------------------------------------
// globalSettings()
//------------------------------------------------------------------
export default (props /*: Props */) => {
  //------------------------------------------------------------------
  // Development
  //------------------------------------------------------------------
  // Turns on some expensive debug features
  gSttngs().set("debug", false);
  // Starts the simulation automatically
  gSttngs().set("autoMode", true);
  // A drag of 0 is no drag. A drag of 1 is 100% drag for this factor.
  // We shoud think about 3 kinds of drag, each one contributing to the total.
  // [1] The first kind of drag is are all the human reasons why things take
  // longer when there is more WIP: context switching, communication,
  // loss of motivation, etc.
  // [2] The second kind of drag is structural and procedural - specialisations,
  // handoffs, dependencies across teams, component/platform/service teams,
  // signoffs, governance overhead, compliance
  // [3] The third kind of drag is technical - technical debt, legacy code, lack
  // of automation, lack of test coverage, lack of CI/CD, lack of monitoring
  // defensive programming, lack of documentation, lack of knowledge sharing
  gSttngs().set("drag", 0.45);
  // Minimum of 1
  gSttngs().set("devPower", 1);
  //------------------------------------------------------------------
  // Workflow
  //------------------------------------------------------------------
  // PARAM: flowSteps[n].limit
  // Q: What steps do we have in our workflow?
  // Q: What WIP limits, if any, do we have for each step?
  // NOTE: We need to start with a "backlog" step, and end with a "done" step,
  // both of which have a limit of 0, which means "no limit".
  // Q: How many items are currently, or typically, or often in each step?
  gSttngs().set("steps", [
    { name: "Open", status: "backlog", limit: 0, preload: 0 },
    { name: "Ready", status: "wait", limit: 0, preload: 0 },
    { name: "In Progress", status: "touch", limit: 0, preload: 0 },
    { name: "Ready for Test", status: "wait", limit: 0, preload: 0 },
    { name: "In Test", status: "touch", limit: 0, preload: 0 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  gSttngs().set("arrivalRate", 2);
  // Q: In "ideal developer days", how many days does each flow item use up?
  // i.e. if everything was perfect and things always went smoothly, and if one
  // person or sub-team could do everything, how long would things take? We want a
  // "min" and a "max" range to cover the different types of work that might be
  // done.
  gSttngs().set("flwItmSizeMin", 1);
  gSttngs().set("flwItmSizeMax", 1);
  gSttngs().set("flwItmSize", { min: 1, max: 1 });
  // Q: What interval do we use for timeboxing or reporting (in working days)?
  gSttngs().set("timeBox", 100);
  // Q: Things that take too long to deliver, often lose their value. Do we have
  // an interval (in working days) after which we check in with the customer/stakeholder
  // to see if they still want the thing we're working on, and reset the priority?
  gSttngs().set("death", 0);
  gSttngs().set("backlogDeath", 0);
  gSttngs().set("backlogMax", 4);
  // Q: How many people are in your whole team - or how many sub-teams do you have?
  gSttngs().set("devUnits", cleanInt(props.devunits) || 2);
  // PARAM: How many things do we expedite each timebox?
  gSttngs().set("expdtLimit", 10);
  // PARAM: Wip limit for wait and touch steps that don't have one set
  gSttngs().set("wipLimit", 20);
  // 1 is 100% of the available devUnits.
  gSttngs().set("expdtdDvUnitsFactor", 1);
  //------------------------------------------------------------------
  // Not yet used...
  //------------------------------------------------------------------
  // Q: How many days can elapse between arrivals of new work items? i.e. how many
  // new items arrive in your backlog each day?
  gSttngs().set("arrivalFrequency", { min: 0.5, max: 10 });
  // Q: When work does arrive, how many items arrive at once?
  gSttngs().set("arrivalVolume", { min: 1, max: 10 });
  // PARAM: Relative to flwItmSize
  // Format: A number between 0 and 1
  gSttngs().set("flwItmSizeFactor", 1);
  // PARAM: Inversely affects flwItmSize, i.e. if there is a value > 0, then the
  // effective flwItmSize is reduced by this factor
  // Format: A number between 0 and 1
  gSttngs().set("dfntnOfReady", 0);

  //------------------------------------------------------------------
  // Not yet used - things that contribute to "dragFactor"
  //------------------------------------------------------------------
  // Q: How much drag is caused by silos, dependencies and handoffs?
  // Consider:
  // To what extent are people, as individuals, specialists (i.e. they only do
  // one thing)? What percentage of the total number of teams (including this one)
  // are "component teams" (i.e. teams that work on a single component of the
  // whole product)?
  // Format: A number between 0 and 1
  gSttngs().set("specialisation", 0);
  // Q: How much drag is caused by changes in the team structure?
  // Consider:
  // How often are people moved between teams? Do people or sub-teams come and go?
  // Format: A number between 0 and 1
  gSttngs().set("teamInstability", 0);
  //------------------------------------------------------------------
  // Calculated values:
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  // Display
  //------------------------------------------------------------------
  gSttngs().set("colorGold", "#ffd700");
  gSttngs().set("colorGrey", "#808080");
  gSttngs().set("colorGreen", "#00ff00");
  gSttngs().set("fps", Math.abs(parseFloat(props.fps) || 1));
  gSttngs().set("scaleCm", cleanInt(props.scalecm) || 7);
  gSttngs().set("scale", cleanInt(gSttngs().get("scaleCm")) / 100);
  gSttngs().set("x", gSttngs().get("scale"));
  gSttngs().set("y", gSttngs().get("scale"));
  gSttngs().set("z", gSttngs().get("scale"));
  gSttngs().set("step", cleanInt(props.stepcm) || gSttngs().get("scale") * 5);
  gSttngs().set("yOffset", gSttngs().get("scale") * 10);
  gSttngs().set("rangeMax", gSttngs().get("yOffset") * 0.3);
  gSttngs().set("rangeIncreaseRate", 1.15);
  gSttngs().set("rangeDecreaseRate", 0.95);
  gSttngs().set("showMetrics", true);
};
