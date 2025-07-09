// @flow
//---------------------------------------------------------------------------
// IMPORT: HELPERS
//---------------------------------------------------------------------------
import isParsable from "./isParsable";
//---------------------------------------------------------------------------
// readSidFromLocalStore()
//---------------------------------------------------------------------------
export const readSidFromLocalStore =
  () /*: string | null | typeof undefined */ => {
    let sid /*: string | null | typeof undefined */ = "NOT SET";
    try {
      // Check if it already exists in localStorage
      sid = localStorage.getItem("sid");
    } catch (e) {}
    // First, check that we got something out of localStorage
    return sid;
  };
export default readSidFromLocalStore;
