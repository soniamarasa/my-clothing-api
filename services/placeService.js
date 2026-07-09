import placeModel from '../models/placeModel.js';
import { placeSchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';

const labels = {
  notFound: 'Local não encontrado.',
  forbiddenEdit: 'Você não tem permissão para editar esse local.',
  forbiddenDelete: 'Você não tem permissão para deletar esse local.',
  deleted: 'Local deletado com sucesso!',
};

const { list, create, update, remove } = makeResourceHandlers({
  model: placeModel,
  createSchema: placeSchema,
  updateSchema: placeSchema,
  labels,
});

export {
  list as getPlaces,
  create as newPlace,
  update as updatePlace,
  remove as deletePlace,
};
