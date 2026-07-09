import categoryModel from '../models/categoryModel.js';
import { categorySchema } from '../validators/index.js';
import { makeResourceHandlers } from '../utils/resourceHandlers.js';

const labels = {
  notFound: 'Categoria não encontrada.',
  forbiddenEdit: 'Você não tem permissão para editar essa categoria.',
  forbiddenDelete: 'Você não tem permissão para deletar essa categoria.',
  deleted: 'Categoria deletada com sucesso!',
};

const { list, create, update, remove } = makeResourceHandlers({
  model: categoryModel,
  createSchema: categorySchema,
  updateSchema: categorySchema,
  labels,
});

export {
  list as getCategories,
  create as newCategory,
  update as updateCategory,
  remove as deleteCategory,
};
