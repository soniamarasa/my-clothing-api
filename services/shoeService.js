import shoeModel from '../models/shoeModel.js';
import { inventorySchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';

const labels = {
  notFound: 'Sapato não encontrado.',
  forbiddenEdit: 'Você não tem permissão para editar esse sapato.',
  forbiddenDelete: 'Você não tem permissão para deletar esse sapato.',
  deleted: 'Sapato deletado com sucesso!',
};

const { list, create, update, remove } = makeResourceHandlers({
  model: shoeModel,
  createSchema: inventorySchema,
  updateSchema: inventorySchema,
  labels,
});

export {
  list as getShoes,
  create as newShoe,
  update as updateShoe,
  remove as deleteShoe,
};
