// @flow
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
//------------------------------------------------------------------------------
// isParsableAsNumber()
//------------------------------------------------------------------------------
export const isParsableAsNumber = (str /*: string */) /*: boolean */ => {
  try {
    const result = JSON.parse(str);
    return typeof result === "number";
  } catch (e) {
    return false;
  }
};
//------------------------------------------------------------------------------
// isParsableAsBoolean()
//------------------------------------------------------------------------------
export const isParsableAsBoolean = (str /*: string */) /*: boolean */ => {
  if (str === null || str === undefined) return false;
  if (typeof str !== "string") return false;
  const value = str.toLowerCase();
  return value === "true" || value === "false";
};
//------------------------------------------------------------------------------
// isParsableAsObject()
//------------------------------------------------------------------------------
const isParsableAsObject = (str /*: string */) /*: boolean */ => {
  try {
    const result = JSON.parse(str);
    return typeof result === "object" && result !== null;
  } catch (e) {
    return false;
  }
};
//------------------------------------------------------------------------------
// isParsableAsArray()
//------------------------------------------------------------------------------
export const isParsableAsArray = (str /*: string */) /*: boolean */ => {
  try {
    const result = JSON.parse(str);
    return Array.isArray(result);
  } catch (e) {
    return false;
  }
};
