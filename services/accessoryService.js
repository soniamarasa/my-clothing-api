import accessoryModel from '../models/accessoryModel.js';

const getAccessories = async (req, res) => {
  const userId = req.userId;
  try {
    const accessories = await accessoryModel.find({
      userId: userId,
    });
    res.send(accessories);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar os acessórios.' + error,
    });
  }
};

const newAccessory = async (req, res) => {
  const accessoryBody = req.body;

  let accessory = new accessoryModel(accessoryBody);
  accessory.userId = req.userId;

  try {
    await accessory.save();
    res.send(accessory);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar o acessório. Tente novamente mais tarde. '
    });
  }
};

const updateAccessory = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const accessoryBody = req.body;

  try {
    const item = await accessoryModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar esse acessório.',
      });
    }

    let accessory = await accessoryModel.findByIdAndUpdate(
      {
        _id: id,
      },
      accessoryBody,
      {
        new: true,
      }
    );

    if (!accessory) {
      res.send({
        message: 'Acessório não encontrado',
      });
    } else {
      res.send(accessory);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar o acessório. Tente novamente mais tarde.' 
    });
  }
};

const deleteAccessory = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const accessory = await accessoryModel.findById({
      _id: id,
    });
    if (accessory.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar esse acessório.',
      });
    }

    const dataId = await accessoryModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Acessório não encontrado.',
      });
    } else {
      res.send({ message: 'Acessório deletado com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar o acessório. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getAccessories, newAccessory, updateAccessory, deleteAccessory };
