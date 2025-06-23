const { workerData, parentPort } = require("worker_threads");

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

const prime = [];
for (let i = 2; i <= workerData.limit; i++) {
  if (isPrime(i)) primes.push(i);
}
parentPort.postMessage(primes);
