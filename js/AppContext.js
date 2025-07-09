// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./flwAttrctr/actions/gSttngs";
import gState from "./flwAttrctr/actions/gState";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { h, render, createContext } from "preact";
import { useReducer, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import Router from "preact-router";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import globalReducer from "./flwAttrctr/calculations/globalReducer";

// A context for the state global management
// $FlowFixMe
const AppContext = createContext([{}, () => {}]);

/*::
type Props = {
	children: Array<function>;
};
*/
const AppProvider /*: function */ = (props /*: Props */) => {
  const fullGlobalStateArray = {
    ...gSttngs().keyValuePairs,
    ...gState().keyValuePairs,
  };
  const [state, dispatch] = useReducer(globalReducer, fullGlobalStateArray);

  useEffect(
    () /*: void */ => {
      const updateComponentState = () => {
        const isUpdtngCnfg = gState().get("isUpdtngCnfg");
        if (isUpdtngCnfg !== true) {
          Object.keys(gSttngs().keyValuePairs).forEach(
            (key /*: any */) /*: void */ => {
              const value = gSttngs().get(key);
              dispatch({ type: "SET", payload: { key, value } });
            },
          );
          Object.keys(gState().keyValuePairs).forEach(
            (key /*: any */) /*: void */ => {
              const value = gState().get(key);
              dispatch({ type: "SET", payload: { key, value } });
            },
          );
        }
        setTimeout(updateComponentState, 300);
      };
      updateComponentState();
    },
    [],
  );

  return html`
      <${AppContext.Provider} value=${[state, dispatch]}>
				${props.children}
      </${AppContext.Provider}>
  `;
};

export { AppContext, AppProvider };
