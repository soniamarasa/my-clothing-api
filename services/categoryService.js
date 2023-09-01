import categoryModel from '../models/categoryModel.js';

const getCategories = async (req, res) => {
  const type = !req.query.type ? 1 : req.query.type;
  const userId = req.userId;
  
  try {
    let categories = await categoryModel.find({
      userId: userId,
      type: type
    })
    res.send(categories);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar as categorias.' + error,
    });
  }
};

const newCategory = async (req, res) => {
  const categoryBody = req.body;

  let category = new categoryModel(categoryBody);
  category.userId = req.userId;

  try {
    await category.save();
    category = {
      category,
      message: `Categoria criada com sucesso!`,
    };
    res.send(category);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar a categoria. Tente novamente mais tarde.' +
        error,
    });
  }
};

const updateCategory = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const categoryBody = req.body;

  try {
    const item = await categoryModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar essa categoria.',
      });
    }

    let category = await categoryModel.findByIdAndUpdate(
      {
        _id: id,
      },
      categoryBody,
      {
        new: true,
      }
    );

    if (!category) {
      res.send({
        message: 'Categoria não encontrada',
      });
    } else {
      category = {
        category,
        message: `Categoria atualizada com sucesso!`,
      };
      res.send(category);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar a categoria. Tente novamente mais tarde.' +
        error,
    });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const category = await categoryModel.findById({
      _id: id,
    });
    if (category.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar essa categoria.',
      });
    }

    const dataId = await categoryModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Categoria não encontrada.',
      });
    } else {
      res.send({ message: 'Categoria deletada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar a categoria. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getCategories, newCategory, updateCategory, deleteCategory };
