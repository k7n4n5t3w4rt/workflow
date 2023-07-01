// @flow
import {
  isParsableAsNumber,
  isParsableAsBoolean,
  isParsableAsArray,
} from "./isParsable.js";
//------------------------------------------------------------------------------
// isParsable()
//------------------------------------------------------------------------------
export default (lSValue /*: string */) /*: boolean */ => {
  return (
    isParsableAsNumber(lSValue) ||
    isParsableAsNumber(lSValue) ||
    isParsableAsBoolean(lSValue) ||
    isParsableAsArray(lSValue)
  );
};
