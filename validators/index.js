import * as Yup from 'yup';
import { HttpError } from '../utils/HttpError.js';

export const inventorySchema = Yup.object({
  name: Yup.string().trim().required(),
  color: Yup.string().trim().nullable(),
  inactive: Yup.boolean().nullable(),
  category: Yup.object().nullable(),
  tag: Yup.object().nullable(),
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
  bottom: Yup.object().nullable(),
  top: Yup.object().nullable(),
  garb: Yup.object().nullable(),
  shoe: Yup.object().nullable(),
  tag: Yup.object().nullable(),
});

export const plannedLookSchema = Yup.object({
  look: Yup.object().required(),
  date: Yup.date().required(),
  place: Yup.object().nullable(),
  status: Yup.object().nullable(),
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
