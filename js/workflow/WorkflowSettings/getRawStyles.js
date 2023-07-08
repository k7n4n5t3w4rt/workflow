// @flow
import { rawStyles } from "../../../web_modules/simplestyle-js.js";
//------------------------------------------------------------------
// FUNCTION: getRawStyles()
//------------------------------------------------------------------
export default () /*: Object */ => {
  rawStyles({
    output: {
      display: "block",
      float: "left",
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
    },
    label: {
      display: "block",
      fontSize: "1rem",
      padding: "0.2rem",
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 2px grey",
    },
    ["input[type=range]"]: {},
    fieldset: {
      display: "block",
      height: "100%",
      boxSizing: "border-box",
      overflow: "auto",
    },
  });

  return rawStyles;
};
