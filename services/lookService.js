import lookModel from '../models/lookModel.js';
import plannedLookModel from '../models/plannedLookModel.js';
import { lookSchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';
import { HttpError } from '../utils/HttpError.js';

const labels = {
  notFound: 'Look não encontrado.',
  forbiddenEdit: 'Você não tem permissão para editar esse look.',
  forbiddenDelete: 'Você não tem permissão para deletar esse look.',
  deleted: 'Look deletado com sucesso!',
};

const { list, create, update, remove } = makeResourceHandlers({
  model: lookModel,
  createSchema: lookSchema,
  updateSchema: lookSchema,
  labels,
});

const getUnusedLooks = async (req, res, next) => {
  try {
    const userId = req.userId;
    const yearParam = req.query.year;
    const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

    if (Number.isNaN(year)) {
      throw new HttpError(400, 'Ano inválido.');
    }

    const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

    const usedLooks = await plannedLookModel.distinct('look', {
      userId,
      'status.id': 2,
      date: { $gte: startOfYear, $lte: endOfYear },
    });

    const usedLookIds = usedLooks.map((look) => look._id.toString());
    const allLooks = await lookModel.find({ userId });
    const unusedLooks = allLooks.filter(
      (look) => !usedLookIds.includes(look._id.toString())
    );

    res.json(unusedLooks);
  } catch (error) {
    next(error);
  }
};

export {
  list as getLooks,
  create as newLook,
  update as updateLook,
  remove as deleteLook,
  getUnusedLooks,
};
