import * as Yup from 'yup';
import { HttpError } from '../utils/HttpError.js';

/** Objetos embutidos (category, tag, look, etc.) — Yup.object() com stripUnknown apaga as chaves internas. */
const embedded = () => Yup.mixed().nullable();

export const inventorySchema = Yup.object({
  name: Yup.string().trim().required(),
  color: Yup.string().trim().nullable(),
  inactive: Yup.boolean().nullable(),
  category: embedded(),
  tag: embedded(),
});

export const tagSchema = Yup.object({
  name: Yup.string().trim().required(),
  icon: Yup.string().nullable(),
  color: Yup.string().nullable(),
});

export const categorySchema = Yup.object({
  name: Yup.string().trim().required(),
  icon: Yup.string().nullable(),
});

export const placeSchema = Yup.object({
  name: Yup.string().trim().required(),
  icon: Yup.string().nullable(),
  color: Yup.string().nullable(),
});

export const lookSchema = Yup.object({
  bottom: embedded(),
  top: embedded(),
  garb: embedded(),
  shoe: embedded(),
  tag: embedded(),
});

export const plannedLookSchema = Yup.object({
  look: Yup.mixed().required(),
  date: Yup.date().required(),
  place: embedded(),
  status: embedded(),
  coat: embedded(),
  handbag: embedded(),
  bandana: embedded(),
  accessories: Yup.array().of(Yup.mixed()).default([]).nullable(),
});

export async function validate(schema, body) {
  try {
    return await schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch {
    throw new HttpError(400, 'Verifique as informações inseridas!');
  }
}
