import lookModel from '../models/lookModel.js';

const getLooks = async (req, res) => {
  const userId = req.userId;
  try {
    const looks = await lookModel.find({
      userId: userId,
    });
    res.send(looks);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar os looks.' + error,
    });
  }
};

const newLook = async (req, res) => {
  const lookBody = req.body;

  let look = new lookModel(lookBody);
  look.userId = req.userId;

  try {
    await look.save();
    look = {
      look,
      message: `Look criado com sucesso!`,
    };
    res.send(look);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar o look. Tente novamente mais tarde. '
    });
  }
};

const updateLook = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const lookBody = req.body;

  try {
    const item = await lookModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar esse look.',
      });
    }

    let look = await lookModel.findByIdAndUpdate(
      {
        _id: id,
      },
      lookBody,
      {
        new: true,
      }
    );

    if (!look) {
      res.send({
        message: 'Look não encontrado',
      });
    } else {
      look = {
        look,
        message: `Look atualizado com sucesso!`,
      };
      res.send(look);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar o look. Tente novamente mais tarde.' 
    });
  }
};

const deleteLook = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const look = await lookModel.findById({
      _id: id,
    });
    if (look.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar esse look.',
      });
    }

    const dataId = await lookModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Look não encontrado.',
      });
    } else {
      res.send({ message: 'Look deletado com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar o look. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getLooks, newLook, updateLook, deleteLook };
