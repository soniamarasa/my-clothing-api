import handbagModel from '../models/handbagModel.js';
import { inventorySchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';

const labels = {
  notFound: 'Bolsa não encontrada.',
  forbiddenEdit: 'Você não tem permissão para editar essa bolsa.',
  forbiddenDelete: 'Você não tem permissão para deletar essa bolsa.',
  deleted: 'Bolsa deletada com sucesso!',
};

const { list, create, update, remove } = makeResourceHandlers({
  model: handbagModel,
  createSchema: inventorySchema,
  updateSchema: inventorySchema,
  labels,
});

export {
  list as getHandbags,
  create as newHandbag,
  update as updateHandbag,
  remove as deleteHandbag,
};
