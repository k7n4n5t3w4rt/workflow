import gSttngs from "./actions/gSttngs.js";

// --------------------------------------------------
// globalSettings()
// --------------------------------------------------
export default (props /*: Props */) => {
  //------------------------------------------------------------------
  // Workflow
  //------------------------------------------------------------------
  // Q: How many people are on a team?
  gSttngs("tmSize", cleanInt(props.teamsize) || 10);
  // Q: What steps do we have in our workflow?
  gSttngs("flwSteps", [
    { name: "Open", status: "backlog", limit: 0 },
    { name: "Doing", status: "touch", limit: 0 },
    { name: "Ready for Test", status: "wait", limit: 0 },
    { name: "In Test", status: "touch", limit: 0 },
    { name: "Ready for Review", status: "wait", limit: 0 },
    { name: "In Review", status: "touch", limit: 0 },
    { name: "Done", status: "done", limit: 0 },
  ]);
  // Q: In "ideal developer days", how much effort does each flow item use up?
  // i.e. if everything was perfect and things always went smoothly, and if one
  // person could do everything, how long would things take? We want a "min" and
  // a "max" range to cover the different types of work that might be done.
  gSttngs("flwItem", { effort: { min: 1, max: 8 } });
  // Q: What interval do we use for timeboxing or reporting (in working days)?
  gSttngs("valueUpdateInterval", 10);
  // Q: Things that take too long to deliver, often lose their value. Do we have
  // an interval (in working days) after which we check in with the customer/stakeholder
  // to see if they still want the thing we're working on, and reset the priority?
  gSttngs("death", 60);
  // This shouldn't really be a setting becaues the display logic can only
  // handle one team right now. So we need to set the number of teams to 1
  gSttngs("tmsNumber", cleanInt(props.teamsnumber) || 1);
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
};

// --------------------------------------------------
// cleanInt()
// --------------------------------------------------
const cleanInt = (getVar /*: string */) /*: number */ => {
  return Math.abs(Math.floor(parseFloat(getVar)) || 0);
};