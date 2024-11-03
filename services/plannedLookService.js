import plannedLookModel from '../models/plannedLookModel.js';

const getPlannedLooks = async (req, res) => {
  const userId = req.userId;
  const status = parseInt(req.query.status, 10); 


  try {
    const plannedLooks = await plannedLookModel.find({
      userId: userId,
      'status.id': status,
    });
    res.send(plannedLooks);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar os looks planejados.' + error,
    });
  }
};

const newPlannedLook = async (req, res) => {
  const plannedLookBody = req.body;

  let plannedLook = new plannedLookModel(plannedLookBody);
  plannedLook.userId = req.userId;

  try {
    await plannedLook.save();

    res.send(plannedLook);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao planejar o look. Tente novamente mais tarde. '
    });
  }
};

const updatePlannedLook = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const plannedLookBody = req.body;

  try {
    const item = await plannedLookModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar esse look planejado.',
      });
    }

    let plannedLook = await plannedLookModel.findByIdAndUpdate(
      {
        _id: id,
      },
      plannedLookBody,
      {
        new: true,
      }
    );

    if (!plannedLook) {
      res.send({
        message: 'Look planejado não encontrado',
      });
    } else {

      res.send(plannedLook);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar o look planejado. Tente novamente mais tarde.' 
    });
  }
};

const deletePlannedLook = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const plannedLook = await plannedLookModel.findById({
      _id: id,
    });
    if (plannedLook.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar esse look planejado.',
      });
    }

    const dataId = await plannedLookModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Look planejado não encontrado.',
      });
    } else {
      res.send({ message: 'Look planejado deletado com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar o look planejado. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getPlannedLooks, newPlannedLook, updatePlannedLook, deletePlannedLook };
