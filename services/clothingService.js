import clothingModel from '../models/clothingModel.js';
import { inventorySchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';

const labels = {
  notFound: 'Roupa não encontrada.',
  forbiddenEdit: 'Você não tem permissão para editar essa roupa.',
  forbiddenDelete: 'Você não tem permissão para deletar essa roupa.',
  deleted: 'Roupa deletada com sucesso!',
};

const { list, create, update, remove } = makeResourceHandlers({
  model: clothingModel,
  listQueryBuilder: (req) => {
    const query = { userId: req.userId };
    if (req.query.categoryId) {
      query['category._id'] = req.query.categoryId;
    }
    return query;
  },
  createSchema: inventorySchema,
  updateSchema: inventorySchema,
  labels,
});

export {
  list as getClothes,
  create as newClothing,
  update as updateClothing,
  remove as deleteClothing,
};
