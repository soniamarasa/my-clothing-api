import bandanaModel from '../models/bandanaModel.js';

const getBandanas = async (req, res) => {
  const userId = req.userId;
  try {
    const bandanas = await bandanaModel.find({
      userId: userId,
    });
    res.send(bandanas);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar as bandanas.' + error,
    });
  }
};

const newBandana = async (req, res) => {
  const bandanaBody = req.body;

  let bandana = new bandanaModel(bandanaBody);
  bandana.userId = req.userId;

  try {
    await bandana.save();

    res.send(bandana);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar a bandana. Tente novamente mais tarde. '
    });
  }
};

const updateBandana = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const bandanaBody = req.body;

  try {
    const item = await bandanaModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar essa bandana.',
      });
    }

    let bandana = await bandanaModel.findByIdAndUpdate(
      {
        _id: id,
      },
      bandanaBody,
      {
        new: true,
      }
    );

    if (!bandana) {
      res.send({
        message: 'Bandana não encontrado',
      });
    } else {
      res.send(bandana);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar a bandana. Tente novamente mais tarde.' 
    });
  }
};

const deleteBandana = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const bandana = await bandanaModel.findById({
      _id: id,
    });
    if (bandana.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar essa bandana.',
      });
    }

    const dataId = await bandanaModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Bandana não encontrada.',
      });
    } else {
      res.send({ message: 'Bandana deletada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar a bandana. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getBandanas, newBandana, updateBandana, deleteBandana };
