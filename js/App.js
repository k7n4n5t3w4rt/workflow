// @flow
import { h } from "../web_modules/preact.js";
import Router from "../web_modules/preact-router.js";
import { html } from "../web_modules/htm/preact.js";
import { AppProvider } from "./AppContext.js";
import Workflow from "./workflow/Workflow.js";
// import registerServiceWorker from "./registerServiceWorker.js";
const finishCounter = {
  ALGORITHMS: [],
  COUNT: 0,
};

/*::
type Props = {
  url: string
};
*/
const App /*: function */ = (props /*: Props */) => {
  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
      	<${Workflow} path="/" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
