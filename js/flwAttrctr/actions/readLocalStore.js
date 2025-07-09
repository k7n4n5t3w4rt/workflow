// @flow
//---------------------------------------------------------------------------
// IMPORT: HELPERS
//---------------------------------------------------------------------------
import isParsable from "./isParsable";
//---------------------------------------------------------------------------
// readLocalStore()
//---------------------------------------------------------------------------
export const readLocalStore = (
  lSValue /*: any */,
  lSTimestamp /*: number */,
  key /*: string */,
) /*: { lSTimestamp:number, lSValue:any } */ => {
  let lSValueTimestamp /*: string | null | typeof undefined */ = null;
  try {
    // Check if it already exists in localStorage
    lSValueTimestamp = localStorage.getItem(key);
  } catch (e) {}
  // First, check that we got something out of localStorage
  if (lSValueTimestamp !== null && lSValueTimestamp !== undefined) {
    // Split the string into value and timestamp
    const lSValueString /*: string */ = lSValueTimestamp.split("___")[0];
    const lSTimestampString /*: string */ = lSValueTimestamp.split("___")[1];
    if (lSValueString !== undefined && lSTimestampString !== undefined) {
      lSValue = JSON.parse(lSValueString);
      lSTimestamp = parseInt(lSTimestampString, 10);
    }
  }
  return { lSTimestamp, lSValue };
};
export default readLocalStore;
