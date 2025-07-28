// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./flwAttrctr/actions/gSttngs.js";
import gState from "./flwAttrctr/actions/gState.js";
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
import globalReducer from "./flwAttrctr/calculations/globalReducer.js";

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
              // Get the current value from both sources
              const globalValue = gSttngs().get(key);

              // Special handling for staggeredStart to ensure consistency
              if (key === "staggeredStart") {
                try {
                  const localStorageItem =
                    localStorage.getItem("staggeredStart");
                  if (localStorageItem) {
                    const localValueStr = localStorageItem.split("___")[0];
                    if (localValueStr) {
                      const localValue = JSON.parse(localValueStr);
                      // Use the localStorage value for consistency
                      dispatch({
                        type: "SET",
                        payload: { key, value: localValue },
                      });
                      return;
                    }
                  }
                } catch (e) {
                  console.error(
                    "Error reading staggeredStart in AppContext:",
                    e,
                  );
                }
              }

              // Normal behavior for other settings
              dispatch({ type: "SET", payload: { key, value: globalValue } });
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
