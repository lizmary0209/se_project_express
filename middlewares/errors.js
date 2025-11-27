module.exports = (err, req, res) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message });
};
