import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
  icon: String,
  type: String,
  clothesType: Number,
});

const tagModel = mongoose.model('tag', tagSchema);

export default tagModel;
