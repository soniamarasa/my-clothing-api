import tagModel from '../models/tagModel.js';

const getTags = async (req, res) => {
  const userId = req.userId;
  try {
    const tags = await tagModel.find({
      userId: userId,
    });
    res.send(tags);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar as tags.' + error,
    });
  }
};

const newTag = async (req, res) => {
  const tagBody = req.body;

  let tag = new tagModel(tagBody);
  tag.userId = req.userId;

  try {
    await tag.save();
    tag = {
      tag,
      message: `Tag criada com sucesso!`,
    };
    res.send(tag);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar a tag. Tente novamente mais tarde. '
    });
  }
};

const updateTag = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const tagBody = req.body;

  try {
    const item = await tagModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar essa tag.',
      });
    }

    let tag = await tagModel.findByIdAndUpdate(
      {
        _id: id,
      },
      tagBody,
      {
        new: true,
      }
    );

    if (!tag) {
      res.send({
        message: 'Tag não encontrada',
      });
    } else {
      tag = {
        tag,
        message: `Tag atualizada com sucesso!`,
      };
      res.send(tag);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar a tag. Tente novamente mais tarde.' 
    });
  }
};

const deleteTag = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const tag = await tagModel.findById({
      _id: id,
    });
    if (tag.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar essa tag.',
      });
    }

    const dataId = await tagModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Tag não encontrada.',
      });
    } else {
      res.send({ message: 'Tag deletada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar a tag. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getTags, newTag, updateTag, deleteTag };
