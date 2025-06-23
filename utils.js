function logRequest(req, res, next) {
  console.log("[${new Data().toISOString()}] ${req.method} ${req.url}");
  next();
}

module.exports = { logRequest };
