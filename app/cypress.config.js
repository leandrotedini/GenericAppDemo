require('dotenv').config()

const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    validUsername: process.env.validUsername,
    validPassword: process.env.validPassword,
    API_PORT:process.env.API_PORT
  }
});
