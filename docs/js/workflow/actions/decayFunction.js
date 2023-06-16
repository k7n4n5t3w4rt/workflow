// @flow
//------------------------------------------------------------------
// decayFunction()
//------------------------------------------------------------------
export const decayFunction = (
  days /*: number */,
  wip /*: number */,
  drag /*: number */,
) /*: number */ => {
  if (wip < 0) {
    throw new Error("WIP should be a non-negative number.");
  }
  if (days < 0) {
    throw new Error("Days should be a non-negative number.");
  }
  if (drag < 0 || drag > 1) {
    throw new Error("Drag should be a number between 0 and 1.");
  }

  const decay = 1 - (drag * wip) / 10;

  if (decay <= 0) {
    return days / 3; // if wip is too large, we return a third of days
  }

  return days * decay;
};
