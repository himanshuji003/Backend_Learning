const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");

const app = express();
const Port = 8000;

app.use(status());

app.get("/", (req, res) => {
  const stream = fs.createReadStream("large_10mb.txt", { encoding: "utf-8" });

  stream.on("data", (chunk) => {
    res.write(chunk);
  });

  stream.on("end", () => {
    res.end();
  });

  stream.on("error", (err) => {
    res.status(500).send("Error reading file");
  });
});

app.listen(Port, () => {
  console.log(`Server Started at Port ${Port}`);
});
