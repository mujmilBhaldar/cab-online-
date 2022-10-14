const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/cab";

mongoose.connect(uri, (err) => {
  if (err) console.log("could not connect", err);
});

const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("connected...");
});
conn.on("disconnected", () => {
  console.log("disconnected...");
});
conn.on("error", () => {
  console.log("Coul not connect...");
});
