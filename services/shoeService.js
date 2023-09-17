import shoeModel from '../models/shoeModel.js';

const getShoes = async (req, res) => {
  const userId = req.userId;
  try {
    const shoes = await shoeModel.find({
      userId: userId,
    });
    res.send(shoes);
  } catch (error) {
    res.send(500).send({
      message: 'Ocorreu um erro ao pesquisar os sapatos.' + error,
    });
  }
};

const newShoe = async (req, res) => {
  const shoeBody = req.body;

  let shoe = new shoeModel(shoeBody);
  shoe.userId = req.userId;

  try {
    await shoe.save();

    res.send(shoe);
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao criar o sapato. Tente novamente mais tarde. '
    });
  }
};

const updateShoe = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;
  const shoeBody = req.body;

  try {
    const item = await shoeModel.findById({
      _id: id,
    });

    if (item.userId !== userId) {
      return res.status(500).send({
        message: 'Você nao tem permissão para editar esse sapato.',
      });
    }

    let shoe = await shoeModel.findByIdAndUpdate(
      {
        _id: id,
      },
      shoeBody,
      {
        new: true,
      }
    );

    if (!shoe) {
      res.send({
        message: 'Sapato não encontrado',
      });
    } else {

      res.send(shoe);
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao atualizar o sapato. Tente novamente mais tarde.' 
    });
  }
};

const deleteShoe = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const shoe = await shoeModel.findById({
      _id: id,
    });
    if (shoe.userId !== userId) {
      return res.status(500).send({
        message: 'Você não tem permissão para deletar esse sapato.',
      });
    }

    const dataId = await shoeModel.findByIdAndRemove({
      _id: id,
    });
    if (!dataId) {
      res.send({
        message: 'Sapato não encontrado.',
      });
    } else {
      res.send({ message: 'Sapato deletado com sucesso!' });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'Um erro ocorreu ao deletar o sapato. Tente novamente mais tarde.' +
        error,
    });
  }
};

export { getShoes, newShoe, updateShoe, deleteShoe };
