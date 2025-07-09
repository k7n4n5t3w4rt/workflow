// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./flwAttrctr/actions/gSttngs.js";
import gState from "./flwAttrctr/actions/gState.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { h, render, createContext } from "../web_modules/preact.js";
import { useReducer, useEffect } from "../web_modules/preact/hooks.js";
import { html } from "../web_modules/htm/preact.js";
import Router from "../web_modules/preact-router.js";
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
