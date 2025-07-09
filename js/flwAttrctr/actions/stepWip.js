// @flow
//------------------------------------------------------------------
// IMPORT: GLOBAL
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";

//------------------------------------------------------------------
// stepWip()
//------------------------------------------------------------------
export default (
  flwMpKey /*: string */,
  expedited /*: boolean */,
) /*: number */ => {
  return gState()
    .get("flwMap")
    [flwMpKey].reduce((_ /*: number */, flwItem /*: FlwItem */) => {
      if (
        (flwItem.dExpedite === expedited ||
          gSttngs().get("expdtQueueLength") === 0) &&
        flwItem.dSkipForWip === false
      ) {
        return (_ += 1);
      }
      return _;
    }, 0);
};
