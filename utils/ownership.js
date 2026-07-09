import { HttpError } from './HttpError.js';

export function assertSameUser(resourceUserId, reqUserId, message) {
  if (String(resourceUserId) !== String(reqUserId)) {
    throw new HttpError(
      403,
      message || 'Você não tem permissão para esta operação.'
    );
  }
}

export function sanitizeResourceBody(body = {}) {
  const safe = { ...body };
  delete safe.userId;
  delete safe._id;
  return safe;
}
