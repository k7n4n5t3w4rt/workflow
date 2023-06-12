import gSttngs from "./gSttngs.js";
import gState from "./gState.js";

export default () => {
  //------------------------------------------------------------------
  // Empty objects and sensible defaults
  //------------------------------------------------------------------
  gState("clicks", 0);
  gState("clckCube", {});
  gState("flwItmTracker", {});
  gState("flwMap", {});
  gState("WIP", 10);
  gState("doneTotal", 0);
  gState("scnData", {});
  //------------------------------------------------------------------
  // Generated values:
  //------------------------------------------------------------------
  gState("vQueue", new xQueue());
  gState("flwtmQueue", new xQueue());
  gState("thrptQueue", new xQueue());
  gState("wipQueue", new xQueue());
  setUpFlwMap(gState().flwMap, gSttngs().flwSteps);
  gState("drag", calculateDrag());
};

//------------------------------------------------------------------
// function calculateDrag()
//------------------------------------------------------------------
const calculateDrag = () /*: number */ => {
  return (
    Math.log(gSttngs().leadTime / gSttngs().processTime) / (gState().WIP - 1)
  );
};

//------------------------------------------------------------------
// setUpFlwMap(gFlwMap, gFlwSteps)
//------------------------------------------------------------------
const setUpFlwMap = (gFlwMap /*: FlwMap */, gFlwSteps /*: FlwStep[] */) => {
  // Set each flwStepTotal to 0
  gFlwSteps.forEach((flwStep /*: FlwStep */, index /*: number */) => {
    gState().flwMap[index.toString()] = [];
  });
};

//------------------------------------------------------------------
// new vQueue()
//------------------------------------------------------------------
function xQueue() {
  this.items = {};
  this.headIndex = 0;
  this.tailIndex = 0;

  this.enqueue = (item /*: number */) => {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  };

  this.dequeue = () => {
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  };

  this.total = () => {
    let total = 0;
    for (const index in this.items) {
      total += this.items[index];
    }
    return total;
  };

  this._85th = () => {
    let total = 0;
    for (const index in this.items) {
      total += this.items[index];
    }
    return total;
  };

  this.length = () => {
    return this.tailIndex - this.headIndex;
  };
}
