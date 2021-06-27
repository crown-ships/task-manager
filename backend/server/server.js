const app = require('../app');
const express = require('express');
const path = require("path");
const port = process.env.PORT || 4000

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve('client', 'build', 'index.html'));
  })
}

app.listen(port, () => console.log("server is up and running"));

module.exports = app;
