import userModel from '../models/userModel.js';
import clothingModel from '../models/clothingModel.js';
import lookModel from '../models/lookModel.js';
import plannedLookModel from '../models/plannedLookModel.js';
import shoeModel from '../models/shoeModel.js';
import handbagModel from '../models/handbagModel.js';
import tagModel from '../models/tagModel.js';
import categoryModel from '../models/categoryModel.js';
import placeModel from '../models/placeModel.js';
import accessoryModel from '../models/accessoryModel.js';
import bandanaModel from '../models/bandanaModel.js';

const userIdIndex = { userId: 1 };

export async function ensureIndexes() {
  await Promise.all([
    userModel.collection.createIndex({ email: 1 }, { unique: true, sparse: true }),
    plannedLookModel.collection.createIndex({
      userId: 1,
      'status.id': 1,
      date: 1,
    }),
    clothingModel.collection.createIndex(userIdIndex),
    lookModel.collection.createIndex(userIdIndex),
    shoeModel.collection.createIndex(userIdIndex),
    handbagModel.collection.createIndex(userIdIndex),
    tagModel.collection.createIndex(userIdIndex),
    categoryModel.collection.createIndex(userIdIndex),
    placeModel.collection.createIndex(userIdIndex),
    accessoryModel.collection.createIndex(userIdIndex),
    bandanaModel.collection.createIndex(userIdIndex),
  ]);
}
