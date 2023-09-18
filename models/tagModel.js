import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  userId: String,
  name: String,
  color: String,
  icon: String,
  type: String,
});

const tagModel = mongoose.model('tag', tagSchema);

export default tagModel;
