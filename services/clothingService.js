import clothingModel from '../models/clothingModel.js';

const getClothes = async (req, res) => {
  const userId = req.userId;
  try {
    const clothes = await clothingModel.find({
      userId: userId,
    });
    res.send(clothes);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar as roupas.' + error,
    });
  }
};

const newClothing = async (req, res) => {
  const clothingBody = req.body;

  let clothing = new clothingModel(clothingBody);
  clothing.userId = req.userId;

  try {
    await clothing.save();
    clothing = {
      clothing,
      message: `Roupa criada com sucesso!`,
    };
    res.send(clothing);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar a roupa. Tente novamente mais tarde. '
    });
  }
};

const updateClothing = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const clothingBody = req.body;

  try {
    const item = await clothingModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar essa roupa.',
      });
    }

    let clothing = await clothingModel.findByIdAndUpdate(
      {
        _id: id,
      },
      clothingBody,
      {
        new: true,
      }
    );

    if (!clothing) {
      res.send({
        message: 'Roupa não encontrada',
      });
    } else {
      clothing = {
        clothing,
        message: `Roupa atualizada com sucesso!`,
      };
      res.send(clothing);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar a roupa. Tente novamente mais tarde.' 
    });
  }
};

const deleteClothing = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const clothing = await clothingModel.findById({
      _id: id,
    });
    if (clothing.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar essa roupa.',
      });
    }

    const dataId = await clothingModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Roupa não encontrada.',
      });
    } else {
      res.send({ message: 'Roupa deletada com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar a roupa. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getClothes, newClothing, updateClothing, deleteClothing };
