import placeModel from '../models/placeModel.js';

const getPlaces = async (req, res) => {
  const userId = req.userId;
  try {
    const places = await placeModel.find({
      userId: userId,
    });
    res.send(places);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar os locais.' + error,
    });
  }
};

const newPlace = async (req, res) => {
  const placeBody = req.body;

  let place = new placeModel(placeBody);
  place.userId = req.userId;

  try {
    await place.save();

    res.send(place);
  } catch (error) {
    res.status(500).send({
      message: 'Um erro ocorreu ao criar o local. Tente novamente mais tarde. ',
    });
  }
};

const updatePlace = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const placeBody = req.body;

  try {
    const item = await placeModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar esse local.',
      });
    }

    let place = await placeModel.findByIdAndUpdate(
      {
        _id: id,
      },
      placeBody,
      {
        new: true,
      }
    );

    if (!place) {
      res.send({
        message: 'Local não encontrado',
      });
    } else {
      res.send(place);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar o local. Tente novamente mais tarde.',
    });
  }
};

const deletePlace = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const place = await placeModel.findById({
      _id: id,
    });
    if (place.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar esse local.',
      });
    }

    const dataId = await placeModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Local não encontrado.',
      });
    } else {
      res.send({ message: 'Local deletado com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar o local. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getPlaces, newPlace, updatePlace, deletePlace };
