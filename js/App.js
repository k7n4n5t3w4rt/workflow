// @flow
import { h } from "preact";
import Router from "preact-router";
import { html } from "htm/preact";
import { AppProvider } from "./AppContext";
import FlwAttrctr from "./flwAttrctr/FlwAttrctr";
import Settings from "./flwAttrctr/Settings/Config";

const finishCounter = {
  ALGORITHMS: [],
  COUNT: 0,
};

/*::
type Props = {
  url: string,
  share: string
};
*/
const App /*: function */ = (props /*: Props */) => {
  console.log("App rendered");
  return html`
    <${AppProvider}>
      <${Router}>
        <${FlwAttrctr} path="/" default />
        <${Settings} path="/config" />
        <${Settings} path="/config" />
        <${Settings} path="/config" />
      </${Router}>
    </${AppProvider}>
  `;
};

export default App;
