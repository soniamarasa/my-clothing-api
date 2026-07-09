import { HttpError } from './HttpError.js';

export function parsePagination(query = {}) {
  const hasPage = query.page !== undefined && query.page !== '';
  const hasLimit = query.limit !== undefined && query.limit !== '';

  if (!hasPage && !hasLimit) {
    return null;
  }

  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));

  if (Number.isNaN(page) || Number.isNaN(limit)) {
    throw new HttpError(400, 'Parâmetros de paginação inválidos.');
  }

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}
