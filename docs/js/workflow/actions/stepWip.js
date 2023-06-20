// @flow
//------------------------------------------------------------------
// IMPORT: GLOBAL
//------------------------------------------------------------------
import gState from "./gState.js";

//------------------------------------------------------------------
// stepWip()
//------------------------------------------------------------------
export default (
  flwMpKey /*: string */,
  expedited /*: boolean */,
) /*: number */ => {
  return gState().flwMap[flwMpKey].reduce(
    (_ /*: number */, flwItem /*: FlwItem */) => {
      if (flwItem.dExpedite === expedited) {
        return (_ += 1);
      }
      return _;
    },
    0,
  );
};
