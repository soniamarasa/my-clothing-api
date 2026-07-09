import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

import userModel from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
import { HttpError } from '../utils/HttpError.js';

const createAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      name: Yup.string().required(),
      birthdate: Yup.date().required(),
      gender: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      throw new HttpError(400, 'Verifique as informações inseridas!');
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      throw new HttpError(400, 'Usuário já existe!');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const { id, name, gender, birthdate, username } = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({ id, name, email, gender, birthdate, username });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      throw new HttpError(400, 'Verifique as informações inseridas!');
    }

    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      throw new HttpError(400, 'E-mail ou senha incorretos.');
    }

    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (!checkPassword) {
      throw new HttpError(400, 'E-mail ou senha incorretos.');
    }

    const { _id, name, gender, birthdate, username } = userExists;

    res.json({
      user: {
        _id,
        name,
        email,
        gender,
        birthdate,
        username,
        token: jwt.sign({ _id }, process.env.SECRET, {
          expiresIn: process.env.EXPIRESIN,
        }),
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.status(200).json({ user: null });
};

const getUser = async (req, res, next) => {
  try {
    const requestedUserId = req.params.userId;

    if (String(requestedUserId) !== String(req.userId)) {
      throw new HttpError(403, 'Você não tem permissão para ver este perfil.');
    }

    const user = await userModel
      .findById(requestedUserId)
      .select('-password')
      .lean();

    if (!user) {
      throw new HttpError(404, 'Usuário não encontrado.');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
      gender,
      birthdate,
      oldPassword,
      confirmPassword,
    } = req.body;
    const { id } = req.params;

    if (!id) {
      throw new HttpError(400, 'Id inválido!');
    }

    if (String(id) !== String(req.userId)) {
      throw new HttpError(403, 'Você não tem permissão para editar este perfil.');
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      birthdate: Yup.date(),
      gender: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      throw new HttpError(400, 'Verifique as informações inseridas!');
    }

    const userExists = await userModel.findById(id);
    if (!userExists) {
      throw new HttpError(404, 'Usuário não existe!');
    }

    if (email && email !== userExists.email) {
      const emailExists = await userModel.findOne({ email });
      if (emailExists) {
        throw new HttpError(400, 'E-mail já registrado!');
      }
    }

    if (oldPassword) {
      const checkPassword = await bcrypt.compare(
        oldPassword,
        userExists.password
      );
      if (!checkPassword) {
        throw new HttpError(400, 'Senha incorreta!');
      }
    }

    if (password && confirmPassword && password !== confirmPassword) {
      throw new HttpError(400, 'Senha atual não confere!');
    }

    const userUpdated = {
      email,
      name,
      gender,
      birthdate,
      ...(password && {
        password: await bcrypt.hash(password, 8),
      }),
    };

    const userEdited = await userModel.findByIdAndUpdate(id, userUpdated, {
      new: true,
      select: '-password',
    });

    res.json(userEdited);
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      throw new HttpError(400, 'Verifique as informações inseridas!');
    }

    const userExists = await userModel.findOne({ email });
    const successMessage =
      'Se o e-mail existir, enviaremos um link para redefinir a senha.';

    if (userExists) {
      const token = jwt.sign({ _id: userExists.id }, process.env.SECRET, {
        expiresIn: '2h',
      });

      const baseUrl = (process.env.BASE_URL || req.body.host || '').replace(
        /\/$/,
        ''
      );
      const link = `${baseUrl}/password-reset/${token}`;

      await sendEmail(
        userExists.email,
        userExists.name,
        'Redefinir senha — Meu Closet',
        link
      );
    }

    res.json({ message: successMessage });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userId = req.userId;

    const schema = Yup.object().shape({
      password: Yup.string().required().min(8),
    });

    if (!(await schema.isValid(req.body))) {
      throw new HttpError(400, 'Verifique as informações inseridas!');
    }

    const userExists = await userModel.findById(userId);
    if (!userExists) {
      throw new HttpError(404, 'Usuário não existe!');
    }

    await userModel.findByIdAndUpdate(userId, {
      password: await bcrypt.hash(password, 8),
    });

    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    next(error);
  }
};

const authorization = async (req, res, next) => {
  const rawToken = req.headers['authorization'];

  if (!rawToken) {
    return res
      .status(401)
      .json({ auth: false, message: 'Nenhum token fornecido.' });
  }

  const token = rawToken.startsWith('Bearer ')
    ? rawToken.slice(7).trim()
    : rawToken.trim();

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ auth: false, message: 'Token expirado.' });
      }
      if (err.name === 'JsonWebTokenError') {
        return res
          .status(401)
          .json({ auth: false, message: 'Token inválido.' });
      }
      return res
        .status(401)
        .json({ auth: false, message: 'Falha ao autenticar o token.' });
    }

    req.userId = decoded._id;
    next();
  });
};

export {
  login,
  logout,
  authorization,
  createAccount,
  updateUser,
  recoverPassword,
  resetPassword,
  getUser,
};
