// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { useContext, useEffect, useState, useReducer } from "preact/hooks";
import { html } from "htm/preact";
import { AppContext } from "../../AppContext.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import setUpdtngCnfg from "./setUpdtngCnfg.js";

/*::
type Props = {
  devUnitsTerm: string,
  changeSetting: (e: Event) => void,
};
*/

export const DevUnitsTerm = (props /*: Props */) /*: string */ => {
  const { devUnitsTerm, changeSetting } = props;
  return html`
    <div>
      <p>
        The Dev Units Term is used to describe the development units (e.g.,
        "Devs", "Engineers", "Squads", "Teams") in the UI. This is a setting
        partly because everyone has their own preference, but also because it
        allows for simulations of different levels or organisation - single
        team, or team of teams.
      </p>
      <label for="devUnitsTerm">Term for "Dev Units":</label>
      <input
        type="text"
        id="devUnitsTerm"
        name="devUnitsTerm"
        value=${devUnitsTerm}
        onInput=${changeSetting}
        onFocus=${() => setUpdtngCnfg(true)}
        onBlur=${() => setUpdtngCnfg(false)}
      />
    </div>
  `;
};

export default DevUnitsTerm;
