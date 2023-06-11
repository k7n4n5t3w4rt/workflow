import gSttngs from "./gSttngs.js";
import gState from "./gState.js";

export default () => {
  gState("clicks", 0);
  gState("flwItems", []);
  gState("clckCube", {});
  gState("flwItmTracker", {});
  gState("flwMap", {});
  setUpFlwMap(gState().flwMap, gSttngs().flwSteps);
  gState("tchTotal", 0);
  gState("doneTotal", 0);
  gState("scnData", {});

  gState("vQueue", new vQueue());
};

const setUpFlwMap = (gFlwMap /*: FlwMap */, gFlwSteps /*: FlwStep[] */) => {
  // Set each flwStepTotal to 0
  gFlwSteps.forEach((flwStep /*: FlwStep */, index /*: number */) => {
    gState().flwMap[index.toString()] = [];
  });
};

function vQueue() {
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

  this.length = () => {
    return this.tailIndex - this.headIndex;
  };
}
