// @flow
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
import { headlessClickLoop } from "./headlessClickLoop.js";
import newFlwItem from "./newFlwItem.js";

// This function will run the simulation headless-ly to generate training data.
export const generateData =
  async () /*: Promise<Array<{x: number, y: number}>> */ => {
    console.log("Starting data generation...");
    const trainingData = [];
    const originalFps = gSttngs().get("fps");
    gSttngs().set("fps", 1000); // Run simulation at max speed

    // Add a check to prevent an infinite loop if newFlwItem is not creating items
    let lastFlwItemCount = 0;
    let stagnantCount = 0;

    // Run the simulation for 1000 "days"
    for (let day = 0; day < 1000; day++) {
      headlessClickLoop();
      if (gState().get("flwItems").length === lastFlwItemCount) {
        stagnantCount++;
      } else {
        stagnantCount = 0;
      }
      lastFlwItemCount = gState().get("flwItems").length;
      if (stagnantCount > 10) {
        // If no new items have been created for 10 days, add one manually
        newFlwItem(0);
      }
    }

    const resultingFlowTime = gState().get("flwTime");
    if (resultingFlowTime > 0) {
      trainingData.push({
        x: gSttngs().get("devPowerFix"),
        y: resultingFlowTime,
      });
    }

    gSttngs().set("fps", originalFps); // Restore original speed
    gSttngs().set("headless", false);
    console.log("Data generation complete.");
    console.log(trainingData);
    return trainingData;
  };
