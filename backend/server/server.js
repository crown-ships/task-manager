const app = require('../app');
const express = require('express');
const path = require("path");
const port = process.env.PORT || 4000

if (process.env.NODE_ENV === "production") {
  // Step 1:
    app.use(express.static(path.resolve(__dirname, "./client/build")));
    // Step 2:
    app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
    });
}

app.listen(port, () => console.log("server is up and running"));

module.exports = app;
