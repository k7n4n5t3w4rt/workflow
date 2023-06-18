//------------------------------------------------------------------
// cleanInt()
//------------------------------------------------------------------
export default (getVar /*: string */) => {
  return Math.abs(Math.floor(parseFloat(getVar)) || 0);
};
