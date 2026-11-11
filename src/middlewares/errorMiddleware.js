function errorHandler(err, req, res, next) {
  console.error(err);

  res.status(500).json({
    erro: "Erro interno no servidor."
  });
}

module.exports = errorHandler;