import { HttpError } from './HttpError.js';
import { assertSameUser, sanitizeResourceBody } from './ownership.js';
import { validate } from '../validators/index.js';

export function makeResourceHandlers({
  model,
  listQueryBuilder,
  createSchema,
  updateSchema,
  labels,
}) {
  const list = async (req, res, next) => {
    try {
      const query = listQueryBuilder
        ? listQueryBuilder(req)
        : { userId: req.userId };
      const items = await model.find(query);
      res.json(items);
    } catch (error) {
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const body = createSchema
        ? await validate(createSchema, req.body)
        : sanitizeResourceBody(req.body);
      const item = new model({ ...body, userId: req.userId });
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) {
        throw new HttpError(404, labels.notFound);
      }

      assertSameUser(item.userId, req.userId, labels.forbiddenEdit);

      const body = updateSchema
        ? await validate(updateSchema, req.body)
        : sanitizeResourceBody(req.body);
      const updated = await model.findByIdAndUpdate(req.params.id, body, {
        new: true,
      });

      res.json(updated);
    } catch (error) {
      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) {
        throw new HttpError(404, labels.notFound);
      }

      assertSameUser(item.userId, req.userId, labels.forbiddenDelete);
      await model.findByIdAndDelete(req.params.id);
      res.json({ message: labels.deleted });
    } catch (error) {
      next(error);
    }
  };

  return { list, create, update, remove };
}
