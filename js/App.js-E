// @flow
import { h } from "../web_modules/preact.js";
import Router from "../web_modules/preact-router.js";
import { html } from "../web_modules/htm/preact.js";
import { AppProvider } from "./AppContext.js";
import FlwAttrctr from "./flwAttrctr/FlwAttrctr.js";
import Settings from "./flwAttrctr/Settings/Config.js";

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
