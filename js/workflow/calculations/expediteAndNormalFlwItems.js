// @flow
//------------------------------------------------------------------
// expediteAndNormalFlwItems()
//------------------------------------------------------------------
export default (
  flwItems /*: FlwItem[] */,
) /*: { expdtFlwItems: FlwItem[], normalFlwItems: FlwItem[] } */ => {
  const expdtFlwItems = flwItems.filter((flwItem /*: FlwItem */) => {
    return flwItem.dExpedite === true;
  });
  const normalFlwItems = flwItems.filter((flwItem /*: FlwItem */) => {
    return flwItem.dExpedite === false;
  });
  return { expdtFlwItems, normalFlwItems };
};
