import plannedLookModel from '../models/plannedLookModel.js';
import { plannedLookSchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';
import { HttpError } from '../utils/HttpError.js';

const labels = {
  notFound: 'Look planejado não encontrado.',
  forbiddenEdit: 'Você não tem permissão para editar esse look planejado.',
  forbiddenDelete: 'Você não tem permissão para deletar esse look planejado.',
  deleted: 'Look planejado deletado com sucesso!',
};

const { create, update, remove } = makeResourceHandlers({
  model: plannedLookModel,
  createSchema: plannedLookSchema,
  updateSchema: plannedLookSchema,
  labels,
});

const getPlannedLooks = async (req, res, next) => {
  try {
    const userId = req.userId;
    const status = parseInt(req.query.status, 10);
    const filterYear = req.query.year;

    if (!filterYear || Number.isNaN(parseInt(filterYear, 10))) {
      throw new HttpError(400, 'Ano inválido.');
    }

    if (Number.isNaN(status)) {
      throw new HttpError(400, 'Status inválido.');
    }

    const plannedLooks = await plannedLookModel
      .find({
        userId,
        'status.id': status,
        date: {
          $gte: new Date(`${filterYear}-01-01`),
          $lte: new Date(`${filterYear}-12-31`),
        },
      })
      .sort({ date: -1 });

    res.json(plannedLooks);
  } catch (error) {
    next(error);
  }
};

export {
  getPlannedLooks,
  create as newPlannedLook,
  update as updatePlannedLook,
  remove as deletePlannedLook,
};
