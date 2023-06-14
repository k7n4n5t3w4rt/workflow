import gSttngs from "./gSttngs.js";

//------------------------------------------------------------------
// globalSettings()
//------------------------------------------------------------------
export default (props /*: Props */) => {
  //------------------------------------------------------------------
  // Workflow
  //------------------------------------------------------------------
  // Q: What steps do we have in our workflow?
  // Q: What WIP limits, if any, do we have for each step?
  // NOTE: We need to start with a "backlog" step, and end with a "done" step,
  // both of which have a limit of 0, which means "no limit".
  // Q: How many items are currently, or typically, or often in each step?
  gSttngs("flwSteps", [
    { name: "Open", status: "backlog", limit: 0, preload: 100 },
    { name: "Ready", status: "wait", limit: 10, preload: 10 },
    { name: "Doing", status: "touch", limit: 0, preload: 140 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  // To save us calculating the number of touch steps, for now
  gSttngs("touchSteps", 3);
  // Q: In "ideal developer days", how much effort does each flow item use up?
  // i.e. if everything was perfect and things always went smoothly, and if one
  // person could do everything, how long would things take? We want a "min" and
  // a "max" range to cover the different types of work that might be done.
  gSttngs("flwItem", { effort: { min: 14, max: 240 } });
  // Q: What interval do we use for timeboxing or reporting (in working days)?
  gSttngs("timeBox", 20);
  // Q: Things that take too long to deliver, often lose their value. Do we have
  // an interval (in working days) after which we check in with the customer/stakeholder
  // to see if they still want the thing we're working on, and reset the priority?
  gSttngs("death", 260);
  // Q: How many people are in your whole team?
  gSttngs("teamSize", cleanInt(props.teamsize) || 360);
  //------------------------------------------------------------------
  // Important but not yet used...
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
  // Q: How big are the things we expedite?
  gSttngs("expediteQueue", { min: 1, max: 10 });
  //------------------------------------------------------------------
  // Not yet used - things that contribute to "dragFactor"
  //------------------------------------------------------------------
  // Q: What percentage of the total number of teams (including this one) are
  // are "component teams" (i.e. teams that work on a single component of the
  // whole product)?
  gSttngs("componentTeamsNum", 0);
  // Q: To what extent are people, as individuals, specialists (i.e. they only do one thing)?
  gSttngs("specialisation", 0);
  // Q: How long do teams (including this one) stay together with no linup changes?
  gSttngs("teamStabilityPeriod", 0);
  // Q:
  gSttngs("PLACEHOLDER", 0);
  //------------------------------------------------------------------
  // Calculated values:
  //------------------------------------------------------------------
  gSttngs(
    "processTimeAverage",
    (gSttngs().flwItem.effort.max + gSttngs().flwItem.effort.min) / 2,
  );
  //------------------------------------------------------------------
  // Display
  //------------------------------------------------------------------
  gSttngs("fps", Math.abs(parseFloat(props.fps) || 1));
  gSttngs("scaleCm", cleanInt(props.scalecm) || 7);
  gSttngs("scale", gSttngs().scaleCm / 100);
  gSttngs("x", gSttngs().scale);
  gSttngs("y", gSttngs().scale);
  gSttngs("z", gSttngs().scale);
  gSttngs("step", cleanInt(props.stepcm) / 100 || gSttngs().scale * 2);
  gSttngs("yOffset", gSttngs().scale * 10);
  gSttngs("rangeMax", gSttngs().yOffset * 0.75);
  gSttngs("rangeIncreaseRate", 1.75);
  gSttngs("rangeDecreaseRate", 0.75);
  //------------------------------------------------------------------
  // Development
  //------------------------------------------------------------------
  // Turns on some expensive debug features
  gSttngs("debug", true);
  // Starts the simulation automatically
  gSttngs("autoMode", true);
  // Manually set the drag for now.
  //
  //        dragFactor = 1 / (WIP / numberOfDevs)
  //
  // Normalise it for current state - WIP = 100, numberOfDevs = 400
  //
  //        dragFactor = 1 / (100 / 400) = 4

  gSttngs("dragFactor", 4);
  // This shouldn't really be a setting becaues the display logic can only
  // handle one team right now. So we need to set the number of teams to 1
  gSttngs("teamsNum", cleanInt(props.teamsnumber) || 1);
};

//------------------------------------------------------------------
// cleanInt()
//------------------------------------------------------------------
const cleanInt = (getVar /*: string */) /*: number */ => {
  return Math.abs(Math.floor(parseFloat(getVar)) || 0);
};
