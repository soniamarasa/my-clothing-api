import accessoryModel from '../models/accessoryModel.js';
import { inventorySchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';

const labels = {
  notFound: 'Acessório não encontrado.',
  forbiddenEdit: 'Você não tem permissão para editar esse acessório.',
  forbiddenDelete: 'Você não tem permissão para deletar esse acessório.',
  deleted: 'Acessório deletado com sucesso!',
};

const { list, create, update, remove } = makeResourceHandlers({
  model: accessoryModel,
  createSchema: inventorySchema,
  updateSchema: inventorySchema,
  labels,
});

export {
  list as getAccessories,
  create as newAccessory,
  update as updateAccessory,
  remove as deleteAccessory,
};
