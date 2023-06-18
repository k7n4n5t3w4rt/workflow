// @flow
import cleanInt from "../calculations/cleanInt.js";
import gSttngs from "./gSttngs.js";

/*::
type Props = {
	fps?: string,
	scalecm?: string,
	stepcm?: string,
  devunits?: string,
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
  gSttngs("debug", false);
  // Starts the simulation automatically
  gSttngs("autoMode", true);
  // A drag of 0 is no drag. A drag of 1 is 100% drag.
  gSttngs("drag", 0.25);
  //------------------------------------------------------------------
  // Workflow
  //------------------------------------------------------------------
  // Q: What steps do we have in our workflow?
  // Q: What WIP limits, if any, do we have for each step?
  // NOTE: We need to start with a "backlog" step, and end with a "done" step,
  // both of which have a limit of 0, which means "no limit".
  // Q: How many items are currently, or typically, or often in each step?
  gSttngs("flwSteps", [
    { name: "Open", status: "backlog", limit: 0, preload: 3 },
    { name: "Ready", status: "wait", limit: 3, preload: 3 },
    { name: "Doing", status: "touch", limit: 3, preload: 3 },
    { name: "Ready for Test", status: "wait", limit: 3, preload: 3 },
    { name: "In Test", status: "touch", limit: 3, preload: 3 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  // Q: In "ideal developer days", how many days does each flow item use up?
  // i.e. if everything was perfect and things always went smoothly, and if one
  // person or sub-team could do everything, how long would things take? We want a
  // "min" and a "max" range to cover the different types of work that might be
  // done.
  gSttngs("flwTmIdlDays", { min: 1, max: 8 });
  // Q: What interval do we use for timeboxing or reporting (in working days)?
  gSttngs("timeBox", 10);
  // Q: Things that take too long to deliver, often lose their value. Do we have
  // an interval (in working days) after which we check in with the customer/stakeholder
  // to see if they still want the thing we're working on, and reset the priority?
  gSttngs("death", 0);
  // Q: How many people are in your whole team - or how many teams do you have?
  // This shouldn't really be a setting becaues the display logic can only
  // handle one team right now. So we need to set the number of teams to 1
  gSttngs("devUnits", cleanInt(props.devunits || "9"));
  //------------------------------------------------------------------
  // Not yet used...
  //------------------------------------------------------------------
  // Q: What is your actual average lead time?
  gSttngs("leadTimeAverage", 160);
  // Q: How many days can elapse between arrivals of new work items? i.e. how many
  // new items arrive in your backlog each day?
  gSttngs("arrivalFrequency", { min: 0.5, max: 10 });
  // Q: When work does arrive, how many items arrive at once?
  gSttngs("arrivalVolume", { min: 1, max: 10 });
  // Q: How many things to we expedite each timebox?
  gSttngs("expediteQueue", 18);
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
  gSttngs("specialisation", 0);
  // Q: How much drag is caused by changes in the team structure?
  // Consider:
  // How often are people moved between teams? Do people or sub-teams come and go?
  // Format: A number between 0 and 1
  gSttngs("teamInstability", 0);
  //------------------------------------------------------------------
  // Calculated values:
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  // Display
  //------------------------------------------------------------------
  gSttngs("fps", Math.abs(parseFloat(props.fps) || 1));
  gSttngs("scaleCm", cleanInt(props.scalecm || "7"));
  gSttngs("scale", gSttngs().scaleCm / 100);
  gSttngs("x", gSttngs().scale);
  gSttngs("y", gSttngs().scale);
  gSttngs("z", gSttngs().scale);
  gSttngs("step", cleanInt(props.stepcm || (gSttngs().scale * 4).toString()));
  gSttngs("yOffset", gSttngs().scale * 10);
  gSttngs("rangeMax", gSttngs().yOffset * 0.75);
  gSttngs("rangeIncreaseRate", 1.75);
  gSttngs("rangeDecreaseRate", 0.75);
};
