const express = require("express");
const myRoutes = express.Router();
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

myRoutes.route("/home").get((req, res) => {
  res.end("home page of the server");
});

const calculateFibonacci = (n) => {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
};

myRoutes.route("/process").get(async (req, res) => {
  if (isMainThread) {
    console.log(isMainThread);
    const worker = new Worker(__filename, {
      workerData: { n: 100 },
    });
// response will be send
    worker.on("message", (result) => {
      res.send(`Result: ${result}`);
    });
// error will be thrown
    worker.on("error", (error) => {
      console.error("Worker error:", error);
      res.status(500).send("Internal Server Error");
    });
  } else {
    const result = calculateFibonacci(workerData.n);
    parentPort.postMessage(result);
  }
});


module.exports = myRoutes;
