const express = require("express");
const cluster = require("cluster");
const os = requires("os");
const { Worker } = require("worker_threads");
const { logRequest } = require("./utils");
app.use(logRequest);

const app = express();
const PORT = 3000;

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log("Master ${process.pid} is running");

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log("Worker ${worker.process.pid} died, restart");
    cluster.fork();
  });
} else {
  app.get("/prime/:limit", (req, res) => {
    const limit = parseInt(req.params.limit);

    const worker = new Worker("./worker.js", {
      workerData: { limit },
    });
    worker.on("message", (primes) => {
      res.json({ primes });
    });
    worker.on("error", (err) => {
      console.error("Worker error:", err);
      res.status(500).send("Internal server error");
    });
  });
  app.listen(PORT, () => {
    console.log("Worker ${process.pid} started at http://localhost:${PORT}");
  });
}
