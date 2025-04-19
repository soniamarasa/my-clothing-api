import lookModel from '../models/lookModel.js';
import plannedLookModel from '../models/plannedLookModel.js';

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

const getUnusedLooks = async (req, res) => {
  const userId = req.userId;
  const yearParam = req.query.year;
  const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();

  if (isNaN(year)) {
    return res.status(400).send({ message: 'Ano inválido.' });
  }

  const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
  const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

  try {
    const usedLooks = await plannedLookModel.distinct('look', {
      userId: userId,
      'status.id': 2,
      date: { $gte: startOfYear, $lte: endOfYear },
    });

    const usedLookIds = usedLooks.map((look) => look._id.toString());

    const allLooks = await lookModel.find({ userId: userId });

    const unusedLooks = allLooks.filter((look) => {
      return !usedLookIds.includes(look._id.toString());
    });

    res.send(unusedLooks);
  } catch (error) {
    res.status(500).send({
      message:
        'Ocorreu um erro ao pesquisar os looks não usados. ' + error.message,
    });
  }
};

export { getLooks, newLook, updateLook, deleteLook, getUnusedLooks };
