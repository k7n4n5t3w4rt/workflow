// @flow
import { h } from "../web_modules/preact.js";
import Router from "../web_modules/preact-router.js";
import { html } from "../web_modules/htm/preact.js";
import { AppProvider } from "./AppContext.js";
import Wrkflw from "./workflow/Workflow.js";
import Settings from "./workflow/WorkflowSettings/Settings.js";
import Params from "./workflow/WorkflowSettings/Params.js";
import Share from "./workflow/Share.js";
// import registerServiceWorker from "./registerServiceWorker.js";
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
  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
      	<${Wrkflw} path="/" />
      	<${Settings} path="/settings" />
      	<${Params} path="/params" />
      	<${Share} path="/share" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
