// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpFlwMap from "./setUpFlwMap.js";
//------------------------------------------------------------------
// FUNCTION: globalState()
//------------------------------------------------------------------
export const globalState = () => {
  try {
    // Ensure sceneInitialized is not persisted across page loads
    localStorage.removeItem("sceneInitialized");
  } catch (e) {
    // ignore potential security errors in sandboxed environments
  }
  gState().setSidButNotInLocalStore("workflowState");
  //------------------------------------------------------------------
  // Controls:
  //------------------------------------------------------------------
  gState().set("started", false);
  gState().set("paused", false);
  gState().set("sceneInitialized", false);
  gState().set("sceneInitialized", false);
  //------------------------------------------------------------------
  // Empty objects and sensible defaults
  //------------------------------------------------------------------
  gState().set("arrivalNumber", gSttngs().get("arrivalRate"));
  gState().set("clckCbGroup", {});
  gState().set("clckCube", {});
  gState().set("clicks", 0);
  gState().set("endPosition", {});
  gState().set("expdtCount", gSttngs().get("expdtQueueLength"));
  gState().set("flwItems", []);
  gState().set("flwItmsToMove", {});
  gState().set("flwItmTracker", {});
  gState().set("flwMap", {});
  setUpFlwMap();
  gState().set("flwItmsPulledCount", 0);
  gState().set("scnData", {});
  gState().set("strtPosition", {});
  gState().set("vSphere", {});
  gState().set("isUpdtngCnfg", false);
  gState().set("tmBox", 0);
  gState().set("thrPutPerDay", 0);
  gState().set("thrPutExpPerDay", 0);
  gState().set("thrPut", 0);
  gState().set("flwTime", 0);
  gState().set("flwTmExp", 0);
  gState().set("wip", 0);
  gState().set("wipExp", 0);
  gState().set("value", 0);
  gState().set("started", 0);
  //------------------------------------------------------------------
  // Generated values:
  //------------------------------------------------------------------
  gState().set("vQueue", new xQueue());
  gState().set("flwTmQueue", new xQueue());
  gState().set("thrPtQueue", new xQueue());
  gState().set("wipQueue", new xQueue());
  gState().set("flwTmExpQueue", new xQueue());
  gState().set("thrPtExpQueue", new xQueue());
  gState().set("wipExpQueue", new xQueue());
};
export default globalState;
//------------------------------------------------------------------
// new vQueue()
//------------------------------------------------------------------
export function xQueue() {
  this.items = {};
  this.headIndex = 0;
  this.tailIndex = 0;

  this.enqueue = (item /*: any */) /*: void */ => {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  };

  this.dequeue = () /*: Array<number> */ => {
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  };

  this.total = () /*: number */ => {
    let total = 0;
    for (const index in this.items) {
      total += this.items[index].reduce(
        (_ /*: number */, item /*: number */) /*: number */ => _ + item,
        0,
      );
    }
    return Math.round(total * 100) / 100;
  };

  // this._85th = () /*: number */ => {
  //   const numbers = [];
  //   for (const index in this.items) {
  //     numbers.push(this.items[index]);
  //   }
  //   if (numbers.length === 0) return 0;
  //   numbers.sort((a, b) => a - b);
  //   let index = Math.ceil((85 / 100) * numbers.length);
  //   return numbers[index - 1];
  // };

  this.dailyMean = () /*: number */ => {
    if (this.length() === 0) return 0;
    let total = 0;
    let count = 0;
    for (const index in this.items) {
      count += 1;
      total += this.items[index].reduce(
        (_ /*: number */, value /*: number */) /*: number */ => {
          if (value > 0) {
            return _ + value;
          }
          return _;
        },
        0,
      );
    }
    // 0/0 = NaN
    if (count === 0) return 0;
    const mean = total / count;
    return Math.round(mean * 100) / 100;
  };

  this.flwItemMean = () /*: number */ => {
    if (this.length() === 0) return 0;
    let total = 0;
    let count = 0;
    for (const index in this.items) {
      total += this.items[index].reduce(
        (_ /*: number */, value /*: number */) /*: number */ => {
          count += 1;
          if (value > 0) {
            return _ + value;
          }
          return _;
        },
        0,
      );
    }
    // 0/0 = NaN
    if (count === 0) return 0;
    const mean = total / count;
    return Math.round(mean * 100) / 100;
  };

  this.length = () /*: number */ => {
    return this.tailIndex - this.headIndex;
  };
}
