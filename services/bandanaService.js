import bandanaModel from '../models/bandanaModel.js';
import { inventorySchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';

const labels = {
  notFound: 'Bandana não encontrada.',
  forbiddenEdit: 'Você não tem permissão para editar essa bandana.',
  forbiddenDelete: 'Você não tem permissão para deletar essa bandana.',
  deleted: 'Bandana deletada com sucesso!',
};

const { list, create, update, remove } = makeResourceHandlers({
  model: bandanaModel,
  createSchema: inventorySchema,
  updateSchema: inventorySchema,
  labels,
});

export {
  list as getBandanas,
  create as newBandana,
  update as updateBandana,
  remove as deleteBandana,
};
