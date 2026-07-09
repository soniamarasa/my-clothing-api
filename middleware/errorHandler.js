export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message =
    statusCode >= 500
      ? 'Erro interno do servidor.'
      : error.message || 'Requisição inválida.';

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({ error: message });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Rota não encontrada.' });
}
