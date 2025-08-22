const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  experimentalFetchPolyfill: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          // console.log(message);
          return null;
        },
      });
      return require("./cypress/plugins/index.cjs")(on, config);
    },
    baseUrl: "http://localhost:5173",
  },
});
