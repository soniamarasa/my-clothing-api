import tagModel from '../models/tagModel.js';
import { tagSchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';

const labels = {
  notFound: 'Tag não encontrada.',
  forbiddenEdit: 'Você não tem permissão para editar essa tag.',
  forbiddenDelete: 'Você não tem permissão para deletar essa tag.',
  deleted: 'Tag deletada com sucesso!',
};

const { list, create, update, remove } = makeResourceHandlers({
  model: tagModel,
  createSchema: tagSchema,
  updateSchema: tagSchema,
  labels,
});

export {
  list as getTags,
  create as newTag,
  update as updateTag,
  remove as deleteTag,
};
