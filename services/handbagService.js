import handbagModel from '../models/handbagModel.js';

const getHandbags = async (req, res) => {
  const userId = req.userId;
  try {
    const handbags = await handbagModel.find({
      userId: userId,
    });
    res.send(handbags);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar os acessórios.' + error,
    });
  }
};

const newHandbag = async (req, res) => {
  const handbagBody = req.body;

  let handbag = new handbagModel(handbagBody);
  handbag.userId = req.userId;

  try {
    await handbag.save();
    handbag = {
      handbag,
      message: `Bolsa criada com sucesso!`,
    };
    res.send(handbag);
  } catch (error) {
    res.status(500).send({
      message: 'Um erro ocorreu ao criar a bolsa. Tente novamente mais tarde. ',
    });
  }
};

const updateHandbag = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const handbagBody = req.body;

  try {
    const item = await handbagModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar essa bolsa.',
      });
    }

    let handbag = await handbagModel.findByIdAndUpdate(
      {
        _id: id,
      },
      handbagBody,
      {
        new: true,
      }
    );

    if (!handbag) {
      res.send({
        message: 'Bolsa não encontrada',
      });
    } else {
      handbag = {
        handbag,
        message: `Bolsa atualizada com sucesso!`,
      };
      res.send(handbag);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar a bolsa. Tente novamente mais tarde.',
    });
  }
};

const deleteHandbag = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const handbag = await handbagModel.findById({
      _id: id,
    });
    if (handbag.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar essa bolsa.',
      });
    }

    const dataId = await handbagModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Bolsa não encontrada.',
      });
    } else {
      res.send({ message: 'Bolsa deletada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar a bolsa. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getHandbags, newHandbag, updateHandbag, deleteHandbag };
