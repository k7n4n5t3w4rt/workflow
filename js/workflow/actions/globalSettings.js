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
  gSttngs("debug", false);
  // Starts the simulation automatically
  gSttngs("autoMode", true);
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
  gSttngs("drag", 0.03);
  //------------------------------------------------------------------
  // Workflow
  //------------------------------------------------------------------
  // PARAM: flowSteps[n].limit
  // Q: What steps do we have in our workflow?
  // Q: What WIP limits, if any, do we have for each step?
  // NOTE: We need to start with a "backlog" step, and end with a "done" step,
  // both of which have a limit of 0, which means "no limit".
  // Q: How many items are currently, or typically, or often in each step?
  gSttngs("steps", [
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
  gSttngs("flwItmSize", { min: 1, max: 3 });
  // Q: What interval do we use for timeboxing or reporting (in working days)?
  gSttngs("timeBox", 10);
  // Q: Things that take too long to deliver, often lose their value. Do we have
  // an interval (in working days) after which we check in with the customer/stakeholder
  // to see if they still want the thing we're working on, and reset the priority?
  gSttngs("death", 0);
  // Q: How many people are in your whole team - or how many sub-teams do you have?
  gSttngs("devUnits", cleanInt(props.devunits) || 10);
  // PARAM: How many things do we expedite each timebox?
  gSttngs("expdtLimit", 3);
  // 1 is 100% of the available devUnits.
  gSttngs("expdtdDvUnitsFactor", 0.5);
  //------------------------------------------------------------------
  // Not yet used...
  //------------------------------------------------------------------
  // Q: How many days can elapse between arrivals of new work items? i.e. how many
  // new items arrive in your backlog each day?
  gSttngs("arrivalFrequency", { min: 0.5, max: 10 });
  // Q: When work does arrive, how many items arrive at once?
  gSttngs("arrivalVolume", { min: 1, max: 10 });
  // PARAM: Relative to flwItmSize
  // Format: A number between 0 and 1
  gSttngs("flwItmSizeFactor", 1);
  // PARAM: Inversely affects flwItmSize, i.e. if there is a value > 0, then the
  // effective flwItmSize is reduced by this factor
  // Format: A number between 0 and 1
  gSttngs("dfntnOfReady", 0);

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
  gSttngs("scaleCm", 7);
  gSttngs("scale", cleanInt(gSttngs().scaleCm) / 100);
  gSttngs("x", gSttngs().scale);
  gSttngs("y", gSttngs().scale);
  gSttngs("z", gSttngs().scale);
  gSttngs("step", cleanInt(props.stepcm) || gSttngs().scale * 4);
  gSttngs("yOffset", gSttngs().scale * 10);
  gSttngs("rangeMax", gSttngs().yOffset * 0.75);
  gSttngs("rangeIncreaseRate", 1.75);
  gSttngs("rangeDecreaseRate", 0.75);
};
