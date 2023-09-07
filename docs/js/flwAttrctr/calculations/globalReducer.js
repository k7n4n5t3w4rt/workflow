// @flow
//------------------------------------------------------------------
// globalReducer()
//------------------------------------------------------------------
const globalReducer = (
  state /*: Object */,
  action /*: { type: "SET", payload: { key:string, value:any } }*/,
) /*: Object */ => {
  switch (action.type) {
    case "SET":
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    default:
      return state;
  }
};

export default globalReducer;
