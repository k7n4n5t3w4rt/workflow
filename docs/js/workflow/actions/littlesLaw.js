// @flow

/*:: type Callback = (number, number) => void; */

const simulateLittlesLaw = (
  arrivalRate /*: number */,
  callback /*: Callback */,
) /*: void */ => {
  let totalCycleTime = 0;
  let totalWIP = 0;
  let completedItems = 0;
  let inProgressItems = 0;
  let totalItems = 0;

  const intervalId = setInterval(() => {
    for (let i = 0; i < arrivalRate; i++) {
      totalItems++;
      inProgressItems++;
      const cycleTime = Math.random() * 10; // Random cycle time between 0 and 10 seconds
      totalCycleTime += cycleTime;
      setTimeout(() => {
        inProgressItems--;
        completedItems++;
        if (completedItems === totalItems) {
          clearInterval(intervalId);
          const averageCycleTime = totalCycleTime / totalItems;
          const averageWIP = totalWIP / 60; // Over 60 seconds
          callback(averageCycleTime, averageWIP);
        }
      }, cycleTime * 1000);
    }
    totalWIP += inProgressItems;
  }, 1000);
};

// Usage:
simulateLittlesLaw(1, (averageCycleTime, averageWIP) => {
  console.log(`Average Cycle Time: ${averageCycleTime}s`);
  console.log(`Average WIP: ${averageWIP}`);
});
