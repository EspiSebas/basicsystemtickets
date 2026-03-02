const errorHandler = (err, req, res, next) => {
  console.error(err); // log interno

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;