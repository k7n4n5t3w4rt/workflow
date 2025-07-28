// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// PREACT
//------------------------------------------------------------------
import { html } from "htm/preact";
import { useEffect, useState } from "preact/hooks";
/*::
type Props = {
  staggeredStart: boolean,
  changeSetting: function,
};
*/
export default (props /*: Props */) /*: string */ => {
  const [isSettingValue, setIsSettingValue] = useState(false);

  // First render: ensure the value from localStorage is used
  useEffect(() => {
    try {
      // Mark that we're handling staggeredStart updates to prevent conflicts
      gState().set("isUpdtngCnfg", true);

      const localStorageItem = localStorage.getItem("staggeredStart");
      if (localStorageItem) {
        const localValueStr = localStorageItem.split("___")[0];
        if (localValueStr) {
          const localValue = JSON.parse(localValueStr);

          // First time only, force the value from localStorage
          if (localValue !== props.staggeredStart) {
            console.log(
              "Initial setting of staggeredStart from localStorage:",
              localValue,
            );

            // Update both the UI state and the internal state
            setIsSettingValue(true);
            props.changeSetting({
              target: {
                type: "checkbox",
                checked: localValue,
              },
            });

            // Force the value in gSttngs for consistency
            gSttngs().set("staggeredStart", localValue);

            // Give time for the update to propagate before releasing the lock
            setTimeout(() => {
              setIsSettingValue(false);
              gState().set("isUpdtngCnfg", false);
            }, 100);
          } else {
            gState().set("isUpdtngCnfg", false);
          }
        } else {
          gState().set("isUpdtngCnfg", false);
        }
      } else {
        gState().set("isUpdtngCnfg", false);
      }
    } catch (e) {
      console.error("Error reading staggeredStart from localStorage:", e);
      gState().set("isUpdtngCnfg", false);
    }
  }, []);

  // Using the state flag to avoid triggering during value sync
  const handleChange = (e) => {
    if (isSettingValue) return; // Skip if we're in the middle of setting the value programmatically

    // Lock updates during our change
    gState().set("isUpdtngCnfg", true);

    // Update the value
    props.changeSetting(e);
    console.log("StaggeredStart manually changed to:", e.target.checked);

    // Make sure the gSttngs value is correctly set
    gSttngs().set("staggeredStart", e.target.checked);

    // Release the lock after a short delay to ensure the change is processed
    setTimeout(() => {
      gState().set("isUpdtngCnfg", false);
    }, 100);
  };

  return html`
    <div data-cy="staggered-start">
      <label>Staggered Start:</label>
      <input
        type="checkbox"
        name="staggered-start"
        id="staggered-start-checkbox"
        checked=${props.staggeredStart === true}
        onChange=${handleChange}
      />
      <div>
        When enabled, new flow items will start with different ages and
        remaining days, simulating items that are already in progress. When
        disabled, all new items start with age 0 and full flow time.
      </div>
    </div>
  `;
};
