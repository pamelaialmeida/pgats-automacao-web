const { defineConfig } = require("cypress");

module.exports = defineConfig({
  blockHosts: [
    '*.googlesyndication.com',
    '*.doubleclick.net',
    '*.adtrafficquality.google',
    '*.mediago.io',
    '*.googleadservices.com',
    '*.google-analytics.com',
  ],
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    defaultCommandTimeout: 15000,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
